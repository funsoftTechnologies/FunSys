import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { Appareil } from "./appareil";

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.css']
})
export class AppareilComponent implements OnInit {
  @Input() appareilName!: string;
  @Input() appareilStatus!: string;

  @Output() statusEvent = new EventEmitter<Appareil>();

  ngOnInit(): void {
  }

  getStatus() {
    return this.appareilStatus;
  }

  // onOn() {
  //   this.statusEvent?.next(new Appareil(this.appareilName,'on'));
  // }
  //
  // onOff() {
  //   this.statusEvent?.next(new Appareil(this.appareilName,'off'));
  //
  // }

  changeStatus($event: any) {
    if($event.target.value == 'on') {
      this.appareilStatus = 'off';
      console.log(this.appareilStatus)
      // this.onOff();
    } else {
      this.appareilStatus = 'on';
      console.log(this.appareilStatus)
      // this.onOn();
    }
    this.statusEvent.next(new Appareil(this.appareilName, this.appareilStatus));
  }

}

