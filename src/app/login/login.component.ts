import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Observable, Subscription } from '../../../node_modules/rxjs';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputUserName: string = '';
  inputPassword: string = '';
  formValidationMessage: string;
  x: string = 'hello, world';
  userNameValidationMessage: string = '';
  passwordValidationMessage: string = '';
  submitActive: boolean = false;
  userSubscription: Subscription;
  user: User;

  constructor(private userSvc: UserService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  login(){
    if (this.inputUserName === ''){
      this.userNameValidationMessage = 'Invalid User Name';
    }else if (this.inputPassword === ''){
      this.passwordValidationMessage = 'Invalid Password';
    }else{

      this.userSubscription = this.userSvc.getUserFromService(this.inputUserName, this.inputPassword).subscribe(user => {
        this.user = user;
        this.router.navigate(['/']);
      })
    }
  }
  goBack(){
    this.location.back();
  }
}