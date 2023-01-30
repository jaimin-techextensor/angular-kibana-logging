import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpWrapperService } from './http/http-wrapper.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    HttpWrapperService
  ]
})
export class CoreModule {
}
