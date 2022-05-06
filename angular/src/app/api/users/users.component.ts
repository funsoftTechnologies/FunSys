import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "./user.service";
import { AlertService } from "../../alert/alert.service";
import { SearchService } from "../header/search.service";

import { User } from "./user";
import { Role } from "./role";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UsersComponent implements OnInit {
  input!: string;

  displayedColumns: string[] = ['id', 'username', 'email', 'actived', 'roles'];
  dataSource = new MatTableDataSource<User>();

  users: User[] = [];
  user!: User;

  roles: Role[] = [];
  role!: Role;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  constructor(private alertService: AlertService,
              private _httpClient: HttpClient,
              private router: Router,
              private usersService: UserService,
              private searchService: SearchService) {
    this.searchService.searchArticle$.subscribe(event =>
      this.applySearch(event));
  }

  ngOnInit() {
    this.getAllRole();
    this.getAllUser();
  }

  getAllUser() {
    this.usersService.getAllUser().subscribe(
      value => {
        this.dataSource.data = value;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.alertService.error('Access Forbidden !');
      });
  }

  postUser() {
    this.usersService.postUser(this.user).subscribe(value =>
      this.alertService.success('Data successfully added.'));
  }

  getAllRole() {
    this.usersService.getAllRole().subscribe(value => this.roles = value);
  }

  postRole() {
      this.usersService.postRole(this.role).subscribe(value =>
        this.alertService.success('Data successfully added.'));
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
