import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Achat } from "../achat";

@Component({
  selector: 'app-achat-detail',
  templateUrl: './achat-detail.component.html',
  styleUrls: ['./achat-detail.component.css']
})
export class AchatDetailComponent implements OnInit{
  achat!: Achat;

  constructor(private router:Router, private route:ActivatedRoute) {
    // console.log(history.state); 2eme solution

    // @ts-ignore
    if(this.router.getCurrentNavigation().extras.state!= undefined)
      { // @ts-ignore
        this.achat = this.router.getCurrentNavigation().extras.state
        localStorage.setItem('achat', JSON.stringify(history.state));
      }
    else
      this.achat = JSON.parse(<string>localStorage.getItem('achat'));

    console.log(this.achat);
  }

  ngOnInit() {
    // localStorage.setItem('achat', JSON.stringify(history.state));
    // this.achat = JSON.parse(<string>localStorage.getItem('achat'));
    // console.log(this.achat.ligneDepenses);
    // console.log(this.achat.ligneDepenses.quantite);
    // console.log(this.achat.total);
    // console.log(this.achat.dateAchat);
  }
}






// this.route.params.subscribe(value => console.log(value));
// this.route.url.subscribe(u => console.log(u));
// this.route.url.subscribe(u => console.log(u[0].path));
// this.route.url.subscribe(u => console.log(u[1].path));
// this.route.url.subscribe(u => console.log(u[2].path));
// console.log(this.router.routerState);
// console.log(this.router.url);
//
// this.route.params.subscribe(param => {
//   console.log(param.achat.value);
//     console.log('id : ' + param.id);
//   }
// );
