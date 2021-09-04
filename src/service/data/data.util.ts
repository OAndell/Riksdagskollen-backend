import { Observable, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import fetch from 'node-fetch';
import { ConstructorOptions, JSDOM } from 'jsdom';
import * as _ from 'lodash';

import { PartyPollingData } from './data.service.interface';
import { getDefaultPollingData } from '../../data/default-data';
import { DataSourceURL, PartyAbbreviation } from './data.service.enum';

export function formatCellText(cellValue: string): string {
    return cellValue.replace(/\s+/g, ' ').trim();
}

export function mapMeanPollDataHTML(response: any): Map<PartyAbbreviation, PartyPollingData> {
    //Extract meanValue table
    const pollingDataMap = _.cloneDeep(getDefaultPollingData());
    const html = response['parse']['text']['*'];
    const dom = new JSDOM(html, 'text/html' as ConstructorOptions);
    const tables: NodeList = dom.window.document.querySelectorAll('.wikitable');
    const tablesSpread = [...tables] as HTMLTableElement[];
    const meanValueTable = [...tablesSpread[0].rows];

    //Map table index to party
    const partyIndexes = new Map<number, string>();
    const partyIndexRow = [...meanValueTable[2].cells];
    partyIndexRow.forEach((cell, index) => {
        partyIndexes.set(index + 1, cell.textContent.trim());
    });

    //Map period and percent to party
    for (let rowIndex = 3; rowIndex < meanValueTable.length; rowIndex++) {
        const cells = [...meanValueTable[rowIndex].cells];
        const period = formatCellText(cells[0].textContent);
        for (let cellIndex = 1; cellIndex < cells.length; cellIndex++) {
            const cellValue = formatCellText(cells[cellIndex].textContent);
            const partyAbbr = partyIndexes.get(cellIndex) as PartyAbbreviation;
            if (pollingDataMap.has(partyAbbr) && period !== "" && cellValue !== "") {
                pollingDataMap.get(partyAbbr).data.push({
                    period,
                    percent: cellValue,
                });
            }
        }
    }
    [...pollingDataMap.values()].forEach((partyPollingData) => (partyPollingData.source = DataSourceURL.POLLING_DATA_URL));
    return pollingDataMap;
}

export function fetchMeanPollingData(): Observable<Map<PartyAbbreviation, PartyPollingData>> {
    return from(fetch(DataSourceURL.POLLING_DATA_API)).pipe(
        mergeMap((response: any) => response.json()),
        map(mapMeanPollDataHTML),
    );
}
