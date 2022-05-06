import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Article } from "../articles/article";
import { TestService } from "./test.service";
import { PanierService } from "../panier/panier.service";
import { AlertService } from "../../alert/alert.service";
import { SearchService } from "../header/search.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  input!: string;

  isArticleInCart: boolean = false;
  article = new FormControl('');
  articles: Article[] = [];
  selectedValue!: number;

  constructor(private snackBar: MatSnackBar,
              private alertService: AlertService,
              private panierService: PanierService,
              private testService: TestService,
              private searchService: SearchService) {
    this.searchService.searchArticle$.subscribe(event =>
      this.applySearch(event))
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.testService.getAll().subscribe(
      value => {
      this.articles = value;
      },
      error => {
        this.alertService.error('Access Forbidden !');
      });
  }

  addToCart(article: Article) {
    this.isArticleInCart = !this.isArticleInCart;
    this.panierService.addToPanier(article);
    this.snackBar.open(article.name, ' a été ajouté au panier', { duration: 2000 });
  }

  removeFromPanier(article: Article) {
    this.panierService.removeFromPanier(article.id)
    this.snackBar.open(article.name, ' a été supprimé du panier', { duration: 2000 });
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    //
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
