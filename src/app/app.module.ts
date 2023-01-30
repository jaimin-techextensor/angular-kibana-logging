import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GlobalErrorHandler } from './core/global-error-handler/global-error-handler.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
