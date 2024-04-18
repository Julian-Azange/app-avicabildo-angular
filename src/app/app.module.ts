import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuHomeComponent } from './components/menu-home/menu-home.component';
import { MenuCategoriesComponent } from './components/menu-categories/menu-categories.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormShoppingComponent } from './pages/form-shopping/form-shopping.component';
import { FormLossesComponent } from './pages/form-losses/form-losses.component';
import { FormSalesComponent } from './pages/form-sales/form-sales.component';
import { FormEarningsComponent } from './pages/form-earnings/form-earnings.component';

import { RouterModule } from '@angular/router';
import { Lot1Component } from './pages/lot-1/lot-1.component';
import { ErrorComponent } from './pages/404/404.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from './components/delete-confirmation-modal/delete-confirmation-modal.component';
import { ModalDatosComponent } from './components/modal-datos/modal-datos.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { EmptyTablesModalComponent } from './components/empty-tables-modal/empty-tables-modal.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuHomeComponent,
    MenuCategoriesComponent,
    HomePageComponent,
    FormShoppingComponent,
    FormLossesComponent,
    FormSalesComponent,
    FormEarningsComponent,
    Lot1Component,
    ErrorComponent,
    DeleteConfirmationModalComponent,
    ModalDatosComponent,
    ConfirmationModalComponent,
    EmptyTablesModalComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
