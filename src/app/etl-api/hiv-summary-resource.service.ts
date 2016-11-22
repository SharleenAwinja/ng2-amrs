import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class HivSummaryResourceService {

  constructor(protected http: Http, protected appSettingsService: AppSettingsService) { }

  getUrl(): string {

    return this.appSettingsService.getEtlRestbaseurl().trim() + 'patient';
  }

  getHivSummary(patientUuid: string,
   startIndex: string, limit: string, includeNonClinicalEncounter?: boolean): Observable<any> {

    let url = this.getUrl();
    url += '/' + patientUuid + '/hiv-summary';

    let params: URLSearchParams = new URLSearchParams();

    if (includeNonClinicalEncounter)
      params.set('includeNonClinicalEncounter', includeNonClinicalEncounter.toString());
    params.set('startIndex', startIndex);
    params.set('limit', limit);

    return this.http.get(url, {
      search: params
    })
      .map((response: Response) => {
      return response.json().result;
    });
  }
}