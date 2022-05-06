import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { LigneDepense } from './ligneDepense';
import { Panier } from "./panier";
import { Achat } from "../achats/achat";

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  subject = new Subject<Panier>();
  panier!: Panier;

  ligneDepense!: LigneDepense;
  ligneDepenses!: LigneDepense[];

  constructor(private http: HttpClient) { }

  addToPanier(article: any) {

    if (localStorage.getItem('panier') == null) {

      this.ligneDepense = new LigneDepense();
      this.ligneDepense.article = article;
      this.ligneDepense.total = article.price;
      this.ligneDepense.quantite = 1;

      this.ligneDepenses = [];
      this.ligneDepenses.push(this.ligneDepense);

      this.panier = new Panier();
      this.panier.ligneDepenses = this.ligneDepenses;
      this.panier.total = this.ligneDepense.total;

      localStorage.setItem('panier', JSON.stringify(this.panier));

    } else {

      this.panier = JSON.parse(<string>localStorage.getItem('panier'));
      let index = -1;
      for (let i = 0; i < this.panier.ligneDepenses.length; i++) {
        this.ligneDepense = this.panier.ligneDepenses[i];

        if (this.ligneDepense.article.id == article.id) {
          index = i;
          break;
        }
      }

      if (index == -1) {
        this.ligneDepense = new LigneDepense();
        this.ligneDepense.article = article;
        this.ligneDepense.total = article.price;
        this.ligneDepense.quantite = 1;


        this.panier.ligneDepenses.push(this.ligneDepense);
        this.panier.total += this.ligneDepense.total;
        this.panier.total  = Math.round(this.panier.total * 100) / 100;

        localStorage.setItem('panier', JSON.stringify(this.panier));
      }
      else {
        this.ligneDepense = this.panier.ligneDepenses[index];
        this.ligneDepense.quantite += 1;
        this.ligneDepense.total = Math.round((this.ligneDepense.article.price * this.ligneDepense.quantite) * 100) / 100;

        this.panier.ligneDepenses[index] = this.ligneDepense;
        this.panier.total += this.ligneDepense.article.price;
        this.panier.total  = Math.round(this.panier.total * 100) / 100;

        localStorage.setItem('panier', JSON.stringify(this.panier));
      }
    }
    this.load();
  }

  removeFromPanier(id: any): void {
    this.panier = JSON.parse(<string>localStorage.getItem('panier'));
    const index = -1;
    for (let i = 0; i < this.panier.ligneDepenses.length; i++) {
      this.ligneDepense = this.panier.ligneDepenses[i];
      if (this.ligneDepense.article.id == id) {
        this.panier.total -= this.ligneDepense.total;
        this.panier.total  = Math.round(this.panier.total * 100) / 100;

        this.panier.ligneDepenses.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.load();
  }

  load() {
    this.panier = JSON.parse(<string>localStorage.getItem('panier'));
    this.subject.next(this.panier);
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }

}
