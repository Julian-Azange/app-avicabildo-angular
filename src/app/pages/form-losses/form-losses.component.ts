import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-losses',
  templateUrl: './form-losses.component.html',
  styleUrls: ['./form-losses.component.css']
})
export class FormLossesComponent {

  constructor (private location: Location) {}

  goBack() {
    this.location.back();
  }
}
