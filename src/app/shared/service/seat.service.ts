import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatService {


  constructor(private http: HttpClient) { }

  dataStore: any 
  =
    {
      seatChart: [
        { row: 1, booked: 2, max: 5, start: 1, booked_seats: [1, 2] },
        { row: 2, booked: 1, max: 5, start: 6, booked_seats: [8] },
        { row: 3, booked: 3, max: 5, start: 11, booked_seats: [13, 14, 15] },
        { row: 4, booked: 0, max: 5, start: 16, booked_seats: [] },
        { row: 5, booked: 0, max: 5, start: 21, booked_seats: [] },

      ],
      total: 25,
      booked: 6,
      rem: 19
    };

 

  private _data = new BehaviorSubject<any>(this.dataStore);

  get data() {
    return this._data.asObservable();
  }

  bookSeats(seatsToBook: any) {
    let rem = seatsToBook;
    let bookedSeats = [];
    main: for (let row of this.dataStore.seatChart) {
      if (rem === 0) break main;
      const rowBookings = Math.min(row.max - row.booked, rem);
      rem -= rowBookings;
      row.booked += rowBookings;
      const bs = row.booked_seats;
      let count = 0;
      inner: for (let i = row.start; i <= row.start + row.max; i++) {
        if (count === rowBookings) break inner;
        const alreadyBooked = bs.some((n: any) => n === i);
        if (!alreadyBooked) {
          count++;
          bs.push(i);
          bookedSeats.push(i);
        }
      }
    }
    this.dataStore.booked += seatsToBook;
    this.dataStore.rem -= seatsToBook;
    return [bookedSeats, this.dataStore.rem];
  }


  //   seatBook(product: any) {
  //   this.seatItemList.push(product);
  //   this.showList.next(this.seatItemList);
  //   // this.getTotalPrice();
  //   console.log("seatItemList",this.seatItemList)
  // }
  
}
  // getProduct() {
  //   return this.showList.asObservable();
  // }
  // //Adding product to cart 


