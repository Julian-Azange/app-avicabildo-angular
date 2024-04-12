import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-sales',
  templateUrl: './form-sales.component.html',
  styleUrls: ['./form-sales.component.css']
})
export class FormSalesComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

}
