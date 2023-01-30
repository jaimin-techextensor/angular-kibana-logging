import { environment } from './../../../environments/environment';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { LogService } from '../log/logger.service';

@Injectable()
export class HttpWrapperService {
  constructor(private http: HttpClient,
    private logService: LogService) { }

  get(url: string, options?: any): Observable<Response> {
    console.log('option in get', options);
    return this.request('GET', url, options);
  }

  post(url: string, options?: any): Observable<Response> {
    return this.request('POST', url, options);
  }

  put(url: string, options?: any): Observable<Response> {
    return this.request('PUT', url, options);
  }

  delete(url: string, options?: any): Observable<Response> {
    return this.request('DELETE', url, options);
  }

  private logTime(startMoment: Moment, url: string, method: string) {
    const requestDuration = moment().diff(startMoment, 'milliseconds');

    this.logService.logHttpInfo(`HTTP ${method}`, requestDuration, url);
  }

  private request(method: string, url: string, options?: any) {
    console.log('options', options);
    return Observable.create((observer: any) => {
      const requestBeginTime = moment();
      this.http.request(new HttpRequest(method, url, options)).subscribe(
        (response) => {
          this.logTime(requestBeginTime, `${url}`, method),
            observer.next(response);
          // observer.complete();
        },
        (error) => {
          switch (error.status) {
            case 403:
              observer.complete();
              break;
            default:
              observer.error(error);
              break;
          }
        }
      );
    });
  }
}
