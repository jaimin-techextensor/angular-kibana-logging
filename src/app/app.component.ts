import { Component, OnInit } from '@angular/core';
import { HttpWrapperService } from './core/http/http-wrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TechLogger-Angular';
  addressTypes: any = [];

  constructor(private httpWrapperService: HttpWrapperService) {

  }

  ngOnInit(): void {
    this.httpWrapperService.get('http://techext-001-site54.itempurl.com/api/addresstypes').subscribe((res: any) => {
      if (res && res.body && res.body.success) {
        this.addressTypes = res.body.data;
      }
    })
  }
}
