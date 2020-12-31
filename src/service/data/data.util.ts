import { Observable, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import fetch from 'node-fetch';
import { ConstructorOptions, JSDOM } from 'jsdom';
import * as _ from 'lodash';

import { PartyPollingData } from './data.service.interface';
import { getDefaultPollingData } from '../../data/default-data';
import { DataSourceURL, PartyAbbreviation } from './data.service.enum';

function formatCellText(cellValue: string): string {
    return cellValue.replace(/\s+/g, ' ').trim();
}

function mapMeanPollDataHTML(response: any): Map<PartyAbbreviation, PartyPollingData> {
    //Extract meanValue table
    const pollingDataMap = _.cloneDeep(getDefaultPollingData());
    const html_code = response['parse']['text']['*'];
    const dom = new JSDOM(html_code, 'text/html' as ConstructorOptions);
    const tables: NodeList = dom.window.document.querySelectorAll('.wikitable');
    const tablesSpread = [...tables] as HTMLTableElement[];
    const meanValueTable = [...tablesSpread[0].rows];

    //Extract map table index to party
    const partyIndexes = new Map<number, string>();
    const partyIndexRow = [...meanValueTable[1].cells];
    partyIndexRow.forEach((cell, index) => {
        partyIndexes.set(index + 1, cell.textContent.trim());
    });

    //Map period and percent to party
    for (let index = 3; index < meanValueTable.length; index++) {
        const cells = [...meanValueTable[index].cells];
        const period = formatCellText(cells[0].textContent);
        for (let i = 1; i < cells.length; i++) {
            const cellValue = formatCellText(cells[i].textContent);
            const partyAbbr = partyIndexes.get(i) as PartyAbbreviation;
            if (pollingDataMap.has(partyAbbr)) {
                pollingDataMap.get(partyAbbr).data.push({
                    period,
                    percent: cellValue,
                });
            }
        }
    }
    return pollingDataMap;
}

export function fetchMeanPollingData(): Observable<Map<PartyAbbreviation, PartyPollingData>> {
    return from(fetch(DataSourceURL.POLLING_DATA)).pipe(
        mergeMap((response: any) => response.json()),
        map(mapMeanPollDataHTML),
    );
}
