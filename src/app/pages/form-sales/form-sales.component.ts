import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SalesService } from './sales.service';

@Component({
    selector: 'app-form-sales',
    templateUrl: './form-sales.component.html',
    styleUrls: ['./form-sales.component.css']
})
export class FormSalesComponent implements OnInit {
    form: FormGroup;
    datos: any[] = [];
    totalValor: number = 0;

    constructor(
        private fb: FormBuilder,
        private salesService: SalesService,
        private location: Location
    ) {
        // Inicializar el formulario
        this.form = this.fb.group({
            item: ['', Validators.required],
            fecha: ['', Validators.required],
            descripcion: ['', Validators.required],
            cantidad: [0, [Validators.required, Validators.min(1)]],
            valor: [0, [Validators.required, Validators.min(0)]],
            observaciones: ['']
        });
    }

    ngOnInit() {
        // Cargar los datos almacenados al inicializar el componente
        this.cargarDatos();
    }

    // Método para agregar datos al servicio y actualizar la lista de datos
    enviarDatos() {
        const nuevoDato = this.form.value;
        this.salesService.agregarDato(nuevoDato);
        this.datos.push(nuevoDato);

        // Actualizar el total de valor
        this.totalValor += nuevoDato.valor;

        // Limpiar el formulario después de enviar
        this.form.reset({
            item: 'defect',
            fecha: '',
            descripcion: '',
            cantidad: 0,
            valor: 0,
            observaciones: ''
        });
    }

    // Método para eliminar un dato específico
    eliminarDato(index: number) {
        const datoAEliminar = this.datos[index];
        this.salesService.eliminarDato(datoAEliminar);

        // Actualizar totalValor restando el valor del dato eliminado
        this.totalValor -= datoAEliminar.valor;

        // Eliminar el dato de la lista
        this.datos.splice(index, 1);
    }

    // Método para cargar datos almacenados
    cargarDatos() {
        this.datos = this.salesService.obtenerDatos();
        this.totalValor = this.datos.reduce((total, dato) => total + dato.valor, 0);
    }

    goBack() {
        this.location.back();
    }
}