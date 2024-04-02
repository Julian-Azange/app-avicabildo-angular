import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-categories',
  templateUrl: './menu-categories.component.html',
  styleUrls: ['./menu-categories.component.css']
})
export class MenuCategoriesComponent {

  constructor(private router: Router) { }

  navigateToShopping() {
    this.router.navigate(['/form-shopping']);
  }

  navigateToLosses() {
    this.router.navigate(['/form-losses']);
  }

  navigateToSales() {
    this.router.navigate(['/form-sales']);
  }

  navigateToEarnings() {
    this.router.navigate(['/form-earnings']);
  }
}
