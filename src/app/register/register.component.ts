import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userSvc: UserService, private location: Location) { }

  inputEmail: string = '';
  inputUserName: string = '';
  inputPassword: string = '';
  inputRePassword: string = '';
  inputOrganization: string = '';
  newUserSubscription: Subscription;

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
        console.log(user);
      })
    }
  }
  goBack(){
    this.location.back();
  }
}
