import { DataSourceURL, PartyAbbreviation } from './data.service.enum';
import { formatCellText, mapMeanPollDataHTML } from './data.util';

const html = `
<table class="wikitable" width="90%" style="text-align:center;">
<tbody>
<tr>
</tr>
<tr>
<th width="40"><a href="/wiki/Socialdemokraterna_(Sverige)" title="Socialdemokraterna (Sverige)">S</a>
</th>
<th width="40"><a href="/wiki/Milj%C3%B6partiet" title="Miljöpartiet">MP</a>
</th>
<th width="40"><a href="/wiki/Centerpartiet" title="Centerpartiet">C</a>
</th>
<th width="40"><a href="/wiki/V%C3%A4nsterpartiet" title="Vänsterpartiet">V</a>
</th>
<th width="40"><a href="/wiki/Liberalerna" title="Liberalerna">L</a>
</th>
<th width="40"><a href="/wiki/Moderaterna" title="Moderaterna">M</a>
</th>
<th width="40"><a href="/wiki/Kristdemokraterna_(Sverige)" title="Kristdemokraterna (Sverige)">KD</a>
</th>
<th width="40"><a href="/wiki/Sverigedemokraterna" title="Sverigedemokraterna">SD</a>
</th>
<th width="60" rowspan="2">Med alla partier
</th>
<th width="60" rowspan="2">Med partier över <a href="/wiki/Sp%C3%A4rregler_i_allm%C3%A4nna_val" title="Spärregler i allmänna val">4&nbsp;%</a>
</th></tr>
<tr>

</tr>
<tr>
<td align="left">December 2020
</td>
<td>26,17&nbsp;%
</td>
<td>3,93&nbsp;%
</td>
<td>7,80&nbsp;%
</td>
<td>10,47&nbsp;%
</td>
<td>2,80&nbsp;%
</td>
<td>22,25&nbsp;%
</td>
<td>5,45&nbsp;%
</td>
<td>19,73&nbsp;%
</td>
<td>47,43&nbsp;%
</td>
<td><b>51,17&nbsp;%</b>
</td>
<td bgcolor="#FF8080"><b>3,74</b>
</td>
<td bgcolor="#80C0FF"><b>2,99</b>
</td></tr>
</tbody></table>
`;

describe('data.util', () => {
    describe('mapMeanPollDataHTML', () => {
        it('should map table data to correct parties', () => {
            const mockData = {
                parse: {
                    text: {
                        '*': html,
                    },
                },
            };
            const result = mapMeanPollDataHTML(mockData);
            expect(result.get(PartyAbbreviation.M).data[0]).toEqual({
                percent: '22,25 %',
                period: 'December 2020',
            });
            expect(result.get(PartyAbbreviation.S).data[0]).toEqual({
                percent: '26,17 %',
                period: 'December 2020',
            });
            expect(result.get(PartyAbbreviation.SD).data[0]).toEqual({
                percent: '19,73 %',
                period: 'December 2020',
            });
            expect(result.get(PartyAbbreviation.C).data[0]).toEqual({
                percent: '7,80 %',
                period: 'December 2020',
            });
            expect(result.get(PartyAbbreviation.V).data[0]).toEqual({
                percent: '10,47 %',
                period: 'December 2020',
            });
            expect(result.get(PartyAbbreviation.KD).data[0]).toEqual({
                percent: '5,45 %',
                period: 'December 2020',
            });
            expect(result.get(PartyAbbreviation.MP).data[0]).toEqual({
                percent: '3,93 %',
                period: 'December 2020',
            });
            expect(result.get(PartyAbbreviation.L).data[0]).toEqual({
                percent: '2,80 %',
                period: 'December 2020',
            });
        });

        it('should add source URL', () => {
            const mockData = {
                parse: {
                    text: {
                        '*': html,
                    },
                },
            };
            const result = mapMeanPollDataHTML(mockData);
            [...result.values()].forEach((value) => {
                expect(value.source).toEqual(DataSourceURL.POLLING_DATA_URL);
            });
        });
    });

    describe('formatCellText', () => {
        it('should remove line breaks', () => {
            const result = formatCellText('\n 40 % \n');
            expect(result).toEqual('40 %');
        });

        it('should trim whitespace', () => {
            const result = formatCellText(' Januari 2021 ');
            expect(result).toEqual('Januari 2021');
        });
    });
});
