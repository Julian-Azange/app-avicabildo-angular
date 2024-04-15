import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-datos',
  templateUrl: './modal-datos.component.html',
  styleUrls: ['./modal-datos.component.css']
})
export class ModalDatosComponent {
  // Recibe los datos a mostrar como entrada
  @Input() datos: any[] = [];
  @Input() totalValor: number = 0;

  constructor(
    private dialogRef: MatDialogRef<ModalDatosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Los datos y el total de valores pueden provenir del `data` inyectado
    this.datos = data.datos;
    this.totalValor = data.totalValor;
  }

  // Método para cerrar el modal
  cerrarModal() {
    this.dialogRef.close();
  }
}
