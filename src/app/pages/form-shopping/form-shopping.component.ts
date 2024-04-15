import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ShoppingService } from './shopping.service'; // Importa el servicio que manejará los datos
import * as $ from 'jquery'; // Importa jQuery
import 'bootstrap'; // Importa Bootstrap

import { MatDialog } from '@angular/material/dialog';
import { ModalDatosComponent } from '../../components/modal-datos/modal-datos.component';


@Component({
  selector: 'app-form-shopping',
  templateUrl: './form-shopping.component.html',
  styleUrls: ['./form-shopping.component.css']
})
export class FormShoppingComponent implements OnInit {

  form: FormGroup; // Define el formulario
  datos: any[] = []; // Array para almacenar los datos
  totalValor: number = 0; // Total de los valores

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private shoppingService: ShoppingService, // Inyecta el servicio
    private dialog: MatDialog // Inyecta MatDialog
  ) {
    // Inicializa el formulario reactivo en el constructor
    this.form = this.fb.group({
      item: [{ value: 'defect', disabled: true }],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.min(1), Validators.required]],
      valor: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit() {
    // Carga los datos almacenados
    this.datos = this.shoppingService.getDatos();
    this.calcularTotal();
  }

  // Método para enviar datos
  enviarDatos() {
    if (this.form.valid) {
      console.log('Formulario válido');
      const nuevoDato = this.form.value;
      console.log('Nuevo dato:', nuevoDato);
      this.shoppingService.guardarDato(nuevoDato);
      this.datos.push(nuevoDato);
      this.calcularTotal();
      this.form.reset(); // Limpia el formulario

      // Mostrar el modal con los datos después de enviar los datos
      this.mostrarDatos();
    } else {
      console.log('Formulario no válido');
    }
  }


  // Método para calcular el total
  calcularTotal() {
    this.totalValor = this.datos.reduce((total, dato) => total + dato.valor, 0);
  }

  // Método para eliminar un dato
  eliminarDato(index: number) {
    const datoEliminado = this.datos.splice(index, 1);
    this.shoppingService.eliminarDato(index);
    this.calcularTotal();
  }

  // Método para mostrar los datos en el modal
  mostrarDatos() {
    this.dialog.open(ModalDatosComponent, {
      data: {
        datos: this.datos,
        totalValor: this.totalValor
      }
    });
  }

  // Método para regresar
  goBack() {
    this.location.back();
  }
}
