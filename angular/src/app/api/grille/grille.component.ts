import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements AfterViewInit, OnDestroy {
  subscription: Subscription;
  automateInitial = [
    ["1", "102", "200", "201", "202"],
    ["100", "102", "201", "202", "301"],
    ["102", "200", "202", "301", "302"],
    ["101", "202", "203", "301", "302"]];
  automate = this.automateInitial;
  automateCycle = [];
  automateEtat = [];

  ngAfterViewInit() {
    // document.getElementById("0").style.background = "red"
    // document.getElementById("99").style.background = "red"
    // document.getElementById("243").style.background = "red"
    // document.getElementById("432").style.background = "red"

    this.process()
    this.display()
  }


  private process() {
    for(let x = 0; x<1000; x++) {
      this.automateCycle = []

      for (let j = 0; j < 4; j++) {
        this.automateEtat = []

        for (let i = 0; i < 5; i++) {
          let cellule = (+this.automateInitial[j][i] + 101).toString();
          this.automateEtat.push(cellule)
        }
        this.automateCycle.push(this.automateEtat)
        this.automate.push(this.automateEtat)
      }
      this.automateInitial = this.automateCycle
      // console.table(this.automateAfter)

      // this.automate.push(this.automateAfter);
    }
    console.table(this.automate)
  }




  display() {
    let j=0;
    const on = interval(200);
    this.subscription = on.subscribe(val => {
      for (let i = 0; i < 5; i++) {
        if (j > 0)
          document.getElementById(this.automate[j - 1][i]).style.background = "white"
      }
      for (let i = 0; i < 5; i++) {
        if(j<177) {
          console.log(i + ' ' + j)
          document.getElementById(this.automate[j][i]).style.background = "black"
        } else
          this.subscription.unsubscribe();
      }
      j++;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}







// let gridtile = document.getElementsByTagName("MAT-GRID-TILE")
// for (let i = 0; i < gridtile.length; i++) {
//   gridtile.item(i)['style'].backgroundColor = "white"
// }



// for (let j = 0; j < 25; j++) {
//   for (let i = 0; i < 100; i++) {
//     document.getElementById(j+''+i).style.background = "red"
//   }
// }


//   console.log(gridtile.length)
// let j=0;
//   setInterval(() => {
//   document.getElementById(this.automateBefore[j][0]).style.background = "white"
//   document.getElementById(this.automateBefore[j][1]).style.background = "white"
//   document.getElementById(this.automateBefore[j][2]).style.background = "white"
//   document.getElementById(this.automateBefore[j][3]).style.background = "white"
//   document.getElementById(this.automateBefore[j][4]).style.background = "white"
//     j++;
//   }, 1000);


// cols: [] =[].constructor(10);
// rows: [] =[].constructor(10);
// arr = [...Array(10)];

// onColRow(i: number, j: number) {
//   let elt = document.getElementById(i+''+j)
//   elt.style.background = 'white'
// }


// onClick($event: MouseEvent) {
//   alert('hi yellow');
// }
