import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userGetInfo, userLogout } from 'src/app/store/actions/user.actions';
import { selectUsers } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userInfo$ = this.store.select(selectUsers);

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(userGetInfo());
  }

  logout() {
    this.store.dispatch(userLogout());
    this.router.navigate(['/login']);
  }
}
