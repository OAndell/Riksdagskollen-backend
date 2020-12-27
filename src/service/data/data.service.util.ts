import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as superagent from 'superagent';

export function selectIdeologies(wikiName: string): Observable<any> {
    const url = `https://sv.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=${wikiName}&rvsection=0`;
    return from(superagent.get(url)).pipe(
        map((res: any) => {
            const content = JSON.parse(res.text);
            const infoBoxText: string = content.query.pages['6641'].revisions[0]['*'];
            const infoBox: string[] = infoBoxText.split('|');
            const ideologiesString = infoBox.find((row) => row.startsWith('ideologi'));
            return ideologiesString; //ideologiesString.match('(?<=[[)(.*?)(?=]])');
        }),
    );
}
