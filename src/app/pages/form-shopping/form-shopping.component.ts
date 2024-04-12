import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-shopping',
  templateUrl: './form-shopping.component.html',
  styleUrls: ['./form-shopping.component.css']
})
export class FormShoppingComponent {

  constructor(private location: Location) {}

    goBack() {
      this.location.back();
    }

}
