import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';
import { SeatService } from 'src/app/shared/service/seat.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  singleShowData: any = [];
  bookingForm!: FormGroup;
  public data$!: Observable<any>;
  public fiveSeater = [1, 2, 3, 4, 5];
  public message = "";
  total: number = 0;
  booked: number = 0;
  rem: number = 0;
  bookings = [];
  
  constructor(private seat: SeatService, private router: ActivatedRoute, private api: ApiService, private _fb: FormBuilder) { }

  ngOnInit(): void {

    this.createForm();
    this.data$ = this.seat.data.pipe(tap(d => (this.rem = d.rem)));
    this.getShowById();
  }


  getShowById() {
    const show_id = this.router.snapshot.params['id']
    this.api.getShowById(show_id)
      .subscribe((resp) => {
        this.singleShowData = resp;
      });
  }

  createForm() {
    this.bookingForm = this._fb.group({
      seatsToBook: ["", Validators.required]
    });
  }

  getSeatNum(n: number, row: number): number {
    return (row - 1) * 5 + n;
  }

  checkBook(n: number, row: number, bs: number[]): boolean {
    const seat = this.getSeatNum(n, row);
    return bs.some(bs => bs === seat);
  }

  book() {
    if (!this.bookingForm.valid) return;
    let { seatsToBook } = this.bookingForm.value;
    if (seatsToBook > 5) {
      this.message = "Max 7 seats at a time";
      this.hideMessage();
      return;
    }
    if (seatsToBook <= 0) {
      this.message = "Min of 1 seat required";
      this.hideMessage();
      return;
    }
    if (this.rem < seatsToBook) {
      this.message = `Only ${this.rem} seats available, reduce num of seats`;
      this.hideMessage();
      return;
    }
    const [bookedSeats, rem] = this.seat.bookSeats(seatsToBook);
    this.rem = rem;
  }

  hideMessage(t = 1500) {
    setTimeout(() => (this.message = ""), t);
  }

}
