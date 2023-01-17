import { Component, OnInit } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TechLogger-Angular';

  constructor(private httpWrapperService: HttpWrapperService) {

  }

  ngOnInit(): void {
    this.httpWrapperService.get('http://techext-001-site54.itempurl.com/api/addresstypes').subscribe(res => {
      debugger
      if (res) {
        alert('Response retrieved');
      }
    })
  }
}
