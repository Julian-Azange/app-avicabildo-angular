import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private router: Router) { }

  navigateToLote1() {
    this.router.navigate(['/lot-1']);
  }

  navigateToError() {
    this.router.navigate(['/error']);
  }
}
