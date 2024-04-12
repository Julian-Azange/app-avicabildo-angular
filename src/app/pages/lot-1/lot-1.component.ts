import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lot-1',
  templateUrl: './lot-1.component.html',
  styleUrls: ['./lot-1.component.css']
})
export class Lot1Component {

  constructor (private location: Location){}

  goBack() {
    this.location.back();
  }
}
