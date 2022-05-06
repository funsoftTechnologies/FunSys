import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AchatService } from "../achats/achat.service";
import { PanierService } from './panier.service';

import { Panier } from "./panier";
import { LigneDepense } from "./ligneDepense";
import {SearchService } from "../header/search.service";

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

export class PanierComponent implements OnInit {
  input!: string;
  panier!: Panier;
  isPanier!: boolean;
  isComponent: string;

  date = new FormControl();

  constructor(private route: ActivatedRoute,
              private router: Router,
              public achatService: AchatService,
              public panierService: PanierService,
              private searchService: SearchService) {
    this.searchService.searchArticle$.subscribe(event =>
      this.applySearch(event))
  }

  ngOnInit() {
    this.isComponent = this.route.snapshot.paramMap.get('isComponent');

    this.panierService.get().subscribe(panier =>  {
      this.panier = panier;
      if(this.panier != null) this.isPanier = true;
      if(this.panier != null) if(this.panier.total == 0) this.isPanier = false;
    } );


    this.panier = JSON.parse(<string>localStorage.getItem('panier'));
    if(this.panier != null) this.isPanier = true;
    if(this.panier != null) if(this.panier.total == 0) this.isPanier = false;
    console.log('ispanier =>   ' + this.isPanier)

  }

  changeQuantite(ligneDepense: LigneDepense, quantite: any) {

    this.panier = JSON.parse(<string>localStorage.getItem('panier'));

    for (let i = 0; i < this.panier.ligneDepenses.length; i++) {
      if (this.panier.ligneDepenses[i].article.id == ligneDepense.article.id) {
        this.panier.ligneDepenses[i].quantite = quantite.value;
        this.panier.ligneDepenses[i].total = Math.round((this.panier.ligneDepenses[i].article.price * this.panier.ligneDepenses[i].quantite) * 100) / 100;
        break;
      }
    }
    this.panier.total = 0;
    for (let i = 0; i < this.panier.ligneDepenses.length; i++) {
      this.panier.total += this.panier.ligneDepenses[i].total;
    }
    this.panier.total  = Math.round(this.panier.total * 100) / 100;
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.panierService.load();
  }


  delete(id: number) {
    this.panierService.removeFromPanier(id);

  }

  post() {
    this.panier = JSON.parse(<string>localStorage.getItem('panier'));
    this.panier.sign = this.panier.ligneDepenses[0].article.sign;
    this.panier.dateAchat = this.date.value;
    this.achatService.post(this.panier).subscribe(value => {
        this.router.navigate(['/achats']);
    });
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
