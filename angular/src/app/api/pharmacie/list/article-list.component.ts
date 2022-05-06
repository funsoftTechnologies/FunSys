import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DBOperation } from "../../../shared/enum";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";

import { MedicationService } from "../medication.service";
import { AlertService } from "../../../alert/alert.service";
import { PanierService } from "../../panier/panier.service";
import { SearchService } from "../../header/search.service";

import { Panier } from "../../panier/panier";
import { Article } from "../article";
import { MedicationDetailComponent } from "../detail/medication-detail.component";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  error: string;
  panier!: Panier;
  isPanier: boolean = false;
  isComponent!: string | null;

  public displayedColumns = [/*'id',*/ 'name', 'price', 'actions', 'panier'];
  input!: string;
  article!: Article;

  dbOps!: DBOperation;
  modalTitle!: string;
  modalBtnTitle!: string;

  dataSource = new MatTableDataSource<Article>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private panierService: PanierService,
              private alertService: AlertService,
              private articleService: MedicationService,
              private searchService: SearchService) {
    this.searchService.searchArticle$
      .subscribe(event =>
        this.applySearch(event))
  }

  ngOnInit() {

    this.panierService.get().subscribe(panier =>  {
      this.panier = panier;
      if(this.panier != null) this.isPanier = true
      if(this.panier != null) if(this.panier.total == 0) this.isPanier = false;
    } );

    this.panier = new Panier();
    this.panier = JSON.parse(<string>localStorage.getItem('panier'));

    if(this.panier != null) this.isPanier = true;
    if(this.panier != null) if(this.panier.total == 0) this.isPanier = false;

    this.isComponent = this.route.snapshot.paramMap.get('isComponent');

    this.getAll();
  }

  getAll(): void {
    this.articleService.getAll()
      .subscribe(
        data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
          error =>
            this.alertService.error('Access Forbidden !')
        );
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addArticle() {
    this.dbOps = DBOperation.create;
    this.modalTitle = 'Add New Article';
    this.modalBtnTitle = 'Add';
    this.openDialog();
  }

  editArticle(article: Article) {
    this.dbOps = DBOperation.update;
    this.modalTitle = 'Edit Article';
    this.modalBtnTitle = 'Update';
    this.article = article;
    this.openDialog();
  }

  deleteArticle(article: Article) {
    this.dbOps = DBOperation.delete;
    this.modalTitle = 'Confirm to Delete?';
    this.modalBtnTitle = 'Delete';
    this.article = article;
    this.openDialog();
  }

  addToPanier(article: Article) {
    this.isPanier = true;
    this.panierService.addToPanier(article);
  }


  openSnackBar(article: Article) {
    this.snackBar.open(article.name, ' a été ajouté au panier', {
      duration: 2000,
    });
  }

  openDialog() {

    const dialogRef = this.dialog.open(MedicationDetailComponent);

    dialogRef.componentInstance.dbOps = this.dbOps;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.article = this.article;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {

        this.getAll();

        switch (this.dbOps) {
          case DBOperation.create:
            this.alertService.success('Data successfully added.'); break;
          case DBOperation.update:
            this.alertService.success('Data successfully updated.'); break;
          case DBOperation.delete:
            this.alertService.success('Data successfully deleted.'); break;
        }
      } else {
        this.alertService.success('There is some issue in saving records, please contact to system administrator!');
      }
    });
  }

}
