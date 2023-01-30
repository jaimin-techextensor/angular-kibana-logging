import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogFields } from './log-data.interface';
import { Logger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logger: Logger | any;
  private userId: string = "0";

  constructor(private http: HttpClient) {
    this.logger = new Logger(environment.appName, environment.endpoints.elasticSearchEndpoint);
  }

  public logHttpInfo(info: any, elapsedTime: number, requestPath: string) {
    // TODO: create and set correlation id
    const url = location.href;
    const logFields: LogFields = {
      environment: environment.env,
      userId: this.userId,
      requestPath,
      elapsedTime,
      url,
    };

    this.logger.log('Information', `${info}`, logFields);
  }

  public logWarning(errorMsg: string) {
    const url = location.href;

    const logFields: LogFields = {
      environment: environment.env,
      userId: this.userId,
      requestPath: '',
      elapsedTime: 0,
      url: url,
    };

    this.logger.log('Warning', errorMsg, logFields);
  }

  public logError(errorMsg: string) {
    const url = location.href;

    const logFields: LogFields = {
      environment: environment.env,
      userId: this.userId,
      requestPath: '',
      elapsedTime: 0,
      url: url,
    };

    this.logger.log('Error', errorMsg, logFields);
  }

  public logInfo(info: any) {
    const url = location.href;

    const logFields: LogFields = {
      environment: environment.env,
      userId: this.userId,
      requestPath: '',
      elapsedTime: 0,
      url,
    };

    this.logger.log('Information', info, logFields);
  }
}
