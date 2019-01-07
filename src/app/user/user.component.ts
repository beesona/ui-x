import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  user: User = new User;
  userSubscription: Subscription;
  constructor(private _usrSvc: UserService) { }

  ngOnInit() {
    this.userSubscription = this._usrSvc.user.subscribe(user => {
      this.user = user;
    });
  }

}
