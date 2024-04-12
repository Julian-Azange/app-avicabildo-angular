import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormShoppingComponent } from './pages/form-shopping/form-shopping.component';
import { Lot1Component } from './pages/lot-1/lot-1.component';
import { ErrorComponent } from './pages/404/404.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'lot-1',
    component: Lot1Component,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'form-shopping',
    component: FormShoppingComponent,
  },
  {
    path: 'form-losses',
    component: FormShoppingComponent,
  },
  {
    path: 'form-sales',
    component: FormShoppingComponent,
  },
  {
    path: 'form-earnings',
    component: FormShoppingComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
