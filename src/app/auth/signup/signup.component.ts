import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  passwordPattern =
    '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}';

  addUser = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    lastName: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)])

  });

  constructor(private api: ApiService,private router: Router) { }

  ngOnInit(): void {
    
  }

  saveUser() {
    alert("User Save Successfully");
    this.api.savedata(this.addUser.value).subscribe((res) => {
      this.addUser.reset({});
      this.router.navigate(['/signin']);
    })
  }





}
