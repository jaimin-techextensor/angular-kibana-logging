import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LogService } from './logger.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  private sentencesForWarningLogging: string[] = [];

  constructor(private injector: Injector) {
    super();
  }

  public override handleError(error: any) {
    const logService: LogService = this.injector.get(LogService);
    const message = error.message ? error.message : error.toString();

    if (error.status) {
      error = new Error(message);
    }

    const errorTraceStr = `Error message:\n${message}.\nStack trace: ${error.stack}`;

    const isWarning = this.isWarning(errorTraceStr);

    if (isWarning) {
      logService.logWarning(errorTraceStr);
    } else {
      logService.logError(errorTraceStr);
    }

    throw error;
  }
  private isWarning(errorTraceStr: string) {
    let isWarning = true;
    // Error comes from app
    if (errorTraceStr.includes('/src/app/')) {
      isWarning = false;
    }

    this.sentencesForWarningLogging.forEach((whiteListSentence) => {
      if (errorTraceStr.includes(whiteListSentence)) {
        isWarning = true;
      }
    });

    return isWarning;
  }
}
