import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userSvc: UserService, private location: Location, private router: Router) { }

  inputEmail: string = '';
  inputUserName: string = '';
  inputPassword: string = '';
  inputRePassword: string = '';
  inputOrganization: string = '';
  newUserSubscription: Subscription;

  formValidationMessage: string;
  emailValidationMessage: string;
  userNameValidationMessage: string;
  passwordValidationMessage: string;
  repasswordValidationMessage: string;
  organizationValidationMessage: string;

  ngOnInit() {
  }

  register(){
    if (this.inputEmail !== '' && 
    this.inputUserName !== '' &&
    this.inputPassword !== '' &&
    this.inputRePassword !== ''){
      let newUser: object = {
        email: this.inputEmail,
        userName: this.inputUserName,
        password: this.inputPassword,
        passwordConf: this.inputRePassword,
        organization: this.inputOrganization
      }
      //send user create
      this.newUserSubscription = this.userSvc.createUser(newUser).subscribe(user => {
        this.router.navigate(['/']);
      })
    }
  }
  goBack(){
    this.location.back();
  }
}
