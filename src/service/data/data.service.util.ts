import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JSDOM } from 'jsdom';

export function selectIdeologies(wikiHtml: Observable<string>): Observable<any> {
    return wikiHtml.pipe(
        map((html) => {
            const doc = new JSDOM(`<!DOCTYPE html>${html}`);
            //TODO
            return '';
        }),
    );
}
