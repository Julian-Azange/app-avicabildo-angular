import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from './data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-modal-datos',
  templateUrl: './modal-datos.component.html',
  styleUrls: ['./modal-datos.component.css']
})
export class ModalDatosComponent {
  @Input() datos: any[] = [];
  @Input() totalValor: number = 0;
  @Input() storageKey: string = ''; // Define la propiedad storageKey


  constructor(
    private dialogRef: MatDialogRef<ModalDatosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private dialog: MatDialog

  ) {
    this.datos = data.datos;
    this.totalValor = data.totalValor;
    this.storageKey = data.storageKey;
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  // Método para eliminar un dato
  eliminarDato(index: number) {
    // Abre el modal de confirmación
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { index }
    });

    // Escuchar la respuesta del modal
    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        const datoEliminado = this.datos.splice(index, 1)[0];
        
        // Realizar la eliminación en el localStorage utilizando el servicio
        // No sabemos de qué componente proviene este modal, así que llama a la eliminación
        // utilizando una función de eliminación en la inyección de dependencia del servicio
        this.dataService.eliminarDato(index, this.storageKey);

        // Restar el valor del dato eliminado al totalValor
        this.totalValor -= datoEliminado.valor;
      }
    });
  }

}
