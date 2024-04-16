import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SalesService } from './sales.service'; // Importa el servicio
import { MatDialog } from '@angular/material/dialog';
import { ModalDatosComponent } from '../../components/modal-datos/modal-datos.component';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';

@Component({
    selector: 'app-form-sales',
    templateUrl: './form-sales.component.html',
    styleUrls: ['./form-sales.component.css']
})
export class FormSalesComponent implements OnInit {
    form: FormGroup; // Define el formulario
    datos: any[] = []; // Array para almacenar los datos
    totalValor: number = 0; // Total de los valores

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private salesService: SalesService, // Inyecta el servicio
        private dialog: MatDialog // Inyecta MatDialog
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
        // Carga los datos almacenados usando la clave específica de almacenamiento
        this.datos = this.salesService.getDatos(this.getStorageKey());
        this.calcularTotal();
    }

    // Método para enviar datos
    enviarDatos() {
        if (this.form.valid) {
            const nuevoDato = this.form.value;
            // Guarda el dato usando la storageKey específica
            this.salesService.guardarDato(nuevoDato, this.getStorageKey());
            this.datos.push(nuevoDato);
            this.calcularTotal();
            this.form.reset(); // Limpia el formulario

            // Mostrar los datos en el modal
            this.mostrarDatos();
        }
    }

    // Método para calcular el total
    calcularTotal() {
        this.totalValor = this.datos.reduce((total, dato) => total + dato.valor, 0);
    }

    /// Método para eliminar un dato
    eliminarDato(index: number) {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            data: { index }
        });

        dialogRef.afterClosed().subscribe((confirmado: boolean) => {
            if (confirmado) {
                // Eliminar la fila si el usuario confirma
                const datoEliminado = this.datos.splice(index, 1)[0];
                this.salesService.eliminarDato(index, this.getStorageKey());
                this.calcularTotal();
            }
        });
    }

    // Método para mostrar los datos
    mostrarDatos() {
        this.dialog.open(ModalDatosComponent, {
            data: {
                datos: this.datos,
                totalValor: this.totalValor,
                storageKey: this.getStorageKey()
            }
        });
    }

    // Método para regresar
    goBack() {
        this.location.back();
    }

    // Método para obtener la clave de almacenamiento específica para ventas
    private getStorageKey(): string {
        return 'claveLocalVentas'; // Ajusta esta clave según tus necesidades
    }
}
