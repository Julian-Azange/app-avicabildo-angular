import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { LossesService } from './losses.service'; // Importa el servicio
import * as $ from 'jquery'; // Importa jQuery
import 'bootstrap'; // Importa Bootstrap

@Component({
  selector: 'app-form-losses',
  templateUrl: './form-losses.component.html',
  styleUrls: ['./form-losses.component.css']
})
export class FormLossesComponent implements OnInit {
    form: FormGroup; // Define el formulario
    datos: any[] = []; // Array para almacenar los datos
    totalValor: number = 0; // Total de los valores

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private LossesService: LossesService // Inyecta el servicio
    ) {
        // Inicializa el formulario reactivo
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
        this.datos = this.LossesService.getDatos();
        this.calcularTotal();
    }

    // Método para enviar datos
    enviarDatos() {
        if (this.form.valid) {
            const nuevoDato = this.form.value;
            this.LossesService.guardarDato(nuevoDato);
            this.datos.push(nuevoDato);
            this.calcularTotal();
            this.form.reset(); // Limpia el formulario
        }
    }

    // Método para calcular el total
    calcularTotal() {
        this.totalValor = this.datos.reduce((total, dato) => total + dato.valor, 0);
    }

    // Método para eliminar un dato
    eliminarDato(index: number) {
        const datoEliminado = this.datos.splice(index, 1);
        this.LossesService.eliminarDato(index);
        this.calcularTotal();
    }

    // Método para mostrar los datos
    mostrarDatos() {
        // Puedes agregar funcionalidades para mostrar los datos si lo necesitas
        
    }

    // Método para regresar
    goBack() {
        this.location.back();
    }
}
