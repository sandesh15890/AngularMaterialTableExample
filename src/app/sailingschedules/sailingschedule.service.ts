import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ServiceUrl, API, Methods } from '../apiUrlsetting.model';
import { ScheduleModel, Place, Location } from './sailingschedule.model';

@Injectable({
  providedIn: 'root',
})
export class SailingscheduleService {
  constructor(private http: HttpClient) {}

  public getSchailingSchedules(from: string, to: string) {
    var url = ServiceUrl.api_url + API.Schedule + '?from=' + from + '&to=' + to;
    return this.http.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }
  public getLocations(searchkey: string): Observable<Location[]> {
    var url =
      ServiceUrl.api_url + API.Codes + Methods.Locations + '?name=' + searchkey;
    return this.http.get(url).pipe(
      map((res) => {
        var arr = res as [];
        return arr.map((item) => {
          return {
            name: item['unCode'],
            un:item['countryCode']
          };
        });
      })
    );
  }
}
