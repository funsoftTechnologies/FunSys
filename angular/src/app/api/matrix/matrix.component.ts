import { Component, OnInit } from '@angular/core';
import { MatrixService } from "./matrix.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-matrix',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'darkcyan'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: '#303030'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  isOpen = true;

  matrix: any[] = [];

  constructor(private matrixService: MatrixService) {
    this.matrix = new Array(91).fill(0);
  }

  ngOnInit(): void {

    for (let i = 0; i < this.matrix.length; i++) {
      this.matrix[i] = new Array(191).fill(0);
    }

    this.matrix[3][3] = 1;
    this.matrix[3][4] = 1;
    this.matrix[3][5] = 1;
    this.matrix[2][5] = 1;
    this.matrix[1][4] = 1;

    // setInterval(() => {
    //   this.postMatrix();
    // }, 500);

  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  postMatrix() {
    this.matrixService
      .postMatrix(this.matrix)
      .subscribe(matrix => {
        this.matrix = matrix;
      });
  }

}
