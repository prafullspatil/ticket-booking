import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showsData :any=[];
  filterType:any;
  searchKey:string="";
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getAllShows().subscribe((res) => {
      this.showsData=res;
      this.filterType=res;
      this.showsData.forEach((a:any) => {
        if(a.type==="movies" || a.type==="plays"){
        }
      });
   
    }); 

  }

  filter(type:string){
    this.filterType = this.showsData.
    filter((a:any)=>{
      if(a.type == type || type==''){
        return a;
      }
    })
  }
}
