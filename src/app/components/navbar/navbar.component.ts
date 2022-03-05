import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import {startWith, map, tap} from 'rxjs/operators';
import { ResponseWithData } from 'src/app/entities/response.entities';
import { UserInfo } from 'src/app/entities/user.entities';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  control = new FormControl();
  streets?: UserInfo[];
  filteredStreets: Observable<UserInfo[]> = new Observable<UserInfo[]>();
  values: Observable<UserInfo[]> = new Observable<UserInfo[]>();

  value = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.values = this.control.valueChanges.pipe(
    //   // getData(),
    //   startWith(''),
    //   map(value => this.getMatchingUsers(value)),
    // );
  }

  // private getAccounts(value: string): UserInfo[] {
  //   console.log(`[getAccounts] ${value}`);
  // }

}
