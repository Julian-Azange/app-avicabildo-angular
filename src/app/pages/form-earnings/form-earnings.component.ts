import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-form-earnings',
  templateUrl: './form-earnings.component.html',
  styleUrls: ['./form-earnings.component.css']
})
export class FormEarningsComponent {

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }

}
