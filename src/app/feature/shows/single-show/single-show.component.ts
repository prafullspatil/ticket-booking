import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/service/api.service';
import { SeatService } from 'src/app/shared/service/seat.service';

@Component({
  selector: 'app-single-show',
  templateUrl: './single-show.component.html',
  styleUrls: ['./single-show.component.scss']
})
export class SingleShowComponent implements OnInit {

  singleShowData:any=[];
  constructor(private api:ApiService,private router:ActivatedRoute, private seat:SeatService) { }

  ngOnInit(): void {
    
    this.getShowById();
  }

  getShowById( ){
    const show_id = this.router.snapshot.params['id']
    this.api.getShowById(show_id)
    .subscribe((resp)=> {
     this.singleShowData = resp; 
    });

  }  

}
