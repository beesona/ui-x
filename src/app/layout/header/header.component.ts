import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable, Subscription } from '../../../../node_modules/rxjs';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  user: User;
  userSubscription: Subscription;
  
  constructor(private _userSvc: UserService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this._userSvc.user.subscribe(usr => { 
      this.user = usr;
      if (this.user.userName){
      this.loggedIn = true;
      }
    });
  }

  login(){
  }

  signout(){
    this.loggedIn = false;
    this.user = new User;
    this._userSvc.logOut();
  }
}
