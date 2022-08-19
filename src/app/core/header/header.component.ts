import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn:boolean=false;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
          this.api.loggedIn$.subscribe((res)=>{
            this.loggedIn=res;
          })
  }
}
