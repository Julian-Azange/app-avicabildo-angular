import { Component } from '@angular/core';
import * as XLSX from 'xlsx'; // Importa la biblioteca xlsx
import { saveAs } from 'file-saver'; // Importa la función saveAs de file-saver
import { EarningsService } from './earnings.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from '../../components/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-form-earnings',
  templateUrl: './form-earnings.component.html',
  styleUrls: ['./form-earnings.component.css']
})
export class FormEarningsComponent {
  today: Date = new Date();
  ganancia: number = 0;

  constructor(
    private earningsService: EarningsService,
    private location: Location,
    private dialog: MatDialog // Inyecta MatDialog
  ) { }

  ngOnInit(): void {
    this.calcularGanancia();
  }

  calcularGanancia(): void {
    this.ganancia = this.earningsService.calcularGanancia();
  }

  // Método para abrir el modal de confirmación
  borrarDatos(): void {
    // Abre el modal
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent);

    // Maneja la respuesta del modal
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario confirmó la eliminación de datos
        this.earningsService.borrarDatos('claveLocalCompras');
        this.earningsService.borrarDatos('claveLocalVentas');
        this.earningsService.borrarDatos('claveLocalPerdidas');
        this.earningsService.borrarDatos('claveLocalGanancias');
        this.calcularGanancia();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  // Método para descargar datos en Excel
  descargarExcel(): void {
    const datos = [
      { item: '1', fecha: this.today.toLocaleDateString(), ganancia: this.ganancia }
    ];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ganancias');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'ganancias.xlsx');
  }
}
