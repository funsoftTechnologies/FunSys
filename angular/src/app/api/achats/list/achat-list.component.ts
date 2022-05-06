import { Component, OnInit, ViewChild} from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { SearchService} from "../../header/search.service";
import { AchatService } from "../achat.service";
import { AlertService } from "../../../alert/alert.service";

import { Achat } from "../achat";

@Component({
  selector: 'app-list-achats',
  templateUrl: './achat-list.component.html',
  styleUrls: ['./achat-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AchatListComponent implements OnInit  {
  clickedRows!: number;
  selectedAchat!: Achat;
  input!: string;
  achats: Achat[] = [];

  displayedColumns: string[] = ['date', 'sign', 'total'];

  dataSource = new MatTableDataSource<Achat>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient,
              private router: Router,
              private achatService: AchatService,
              private alertService: AlertService,
              private searchService: SearchService) {
    this.searchService.searchArticle$.subscribe(event =>
        this.applySearch(event))
  }

  ngOnInit() {

      // for (let i = 0; i < this.achats.length; i++) {
      //   this.achats[i].dateAchat = new Date(this.achats[i].dateAchat);
      // }


      // this.dataSource.sortingDataAccessor = (item, property) => {
      //   switch (property) {
      //     case 'dateAchat':
      //       return new Date(item.dateAchat);
      //     default:
      //       return item[property];
      //   }
      // };
    this.getAll();

  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAll(): void {
    this.achatService.getAll()
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        error =>
          this.alertService.error('Access Forbidden !')
      );
  }
}
