import { Component } from '@angular/core';
import * as XLSX from 'xlsx'; // Importa la biblioteca xlsx
import { saveAs } from 'file-saver'; // Importa la función saveAs de file-saver
import { EarningsService } from './earnings.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from '../../components/delete-confirmation-modal/delete-confirmation-modal.component';

import { EmptyTablesModalComponent } from '../../components/empty-tables-modal/empty-tables-modal.component';

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
    const item = "1"; // Asigna el valor apropiado para el `item`
    const fecha = this.today.toLocaleDateString(); // Obtiene la fecha actual en formato de cadena
    this.ganancia = this.earningsService.calcularGanancia();

    // Guarda la última ganancia calculada en `localStorage` con `item` y `fecha`
    this.earningsService.guardarGanancias(item, fecha, this.ganancia);
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



  // Método para verificar si las tablas están vacías
  verificarTablasVacias(): boolean {
    const keys = ['claveLocalCompras', 'claveLocalVentas', 'claveLocalPerdidas', 'claveLocalGanancias'];
    for (const key of keys) {
      const data = this.earningsService.getData(key);
      if (data.length === 0) {
        return true; // Si alguna tabla está vacía, devuelve true
      }
    }
    return false; // Si todas las tablas tienen datos, devuelve false
  }

  descargarExcel(): void {

    // Verificar si las tablas están vacías
    if (this.verificarTablasVacias()) {
      // Si las tablas están vacías, abre un modal para advertir al usuario
      this.dialog.open(EmptyTablesModalComponent);
      return;
    }

    // Crear un nuevo libro de Excel
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Lista de claves de `localStorage` y nombres de hojas correspondientes
    const claves: { key: string, sheetName: string }[] = [
      { key: 'claveLocalCompras', sheetName: 'Compras' },
      { key: 'claveLocalVentas', sheetName: 'Ventas' },
      { key: 'claveLocalPerdidas', sheetName: 'Perdidas' },
      { key: 'claveLocalGanancias', sheetName: 'Ganancias' }
    ];

    // Recorre cada clave y crea una hoja en el libro de Excel con los datos de cada tabla
    claves.forEach(({ key, sheetName }) => {
      // Obten los datos de `localStorage` para la clave especificada
      const datos = this.earningsService.getData(key);

      // Crea una hoja de cálculo a partir de los datos y agrégala al libro de Excel
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    // Generar el buffer para el libro de Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Crear un Blob con el buffer y guardar el archivo
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'datos.xlsx');
  }




  goBack(): void {
    this.location.back();
  }

  // Método para obtener la clave de almacenamiento específica para pérdidas
  private getStorageKey(): string {
    return 'claveLocalGanancias'; // Ajusta esta clave según tus necesidades
  }

}
