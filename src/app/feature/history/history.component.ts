import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  history:any=[];
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getHistory().subscribe((res)=>{
      this.history=res;
     
    })
  }

}
