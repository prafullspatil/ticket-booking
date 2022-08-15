import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  submitted = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  passwordPattern =
    '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}';
  loginForm =new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password:new FormControl('',[Validators.required, Validators.pattern(this.passwordPattern)])
  });

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loginForm;
  }
  login() {
    this.submitted = true;
    this.api.getLoginDetails(this.loginForm.value.email, this.loginForm.value.password);
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
}
