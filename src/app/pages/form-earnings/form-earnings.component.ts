import { Component } from '@angular/core';
import * as XLSX from 'xlsx'; // Importa la biblioteca xlsx
import { saveAs } from 'file-saver'; // Importa la función saveAs de file-saver
import { EarningsService } from './earnings.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-form-earnings',
  templateUrl: './form-earnings.component.html',
  styleUrls: ['./form-earnings.component.css']
})
export class FormEarningsComponent {
  today: Date = new Date();
  ganancia: number = 0;


  constructor(private earningsService: EarningsService, private location: Location,) { }

  ngOnInit(): void {
    this.calcularGanancia();
  }

  calcularGanancia(): void {
    this.ganancia = this.earningsService.calcularGanancia();
  }

  borrarDatos(): void {
    this.earningsService.borrarDatos('claveLocalGanancias');
    this.calcularGanancia();
  }

  goBack(): void {
    this.location.back();
  }


  // Método para descargar datos en Excel
  descargarExcel(): void {
    // Datos para exportar
    const datos = [
        { item: '1', fecha: this.today.toLocaleDateString(), ganancia: this.ganancia }
    ];

    // Crear hoja de cálculo (Worksheet)
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);

    // Crear libro de trabajo (Workbook)
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ganancias');

    // Convertir libro de trabajo a archivo binario
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Guardar el archivo Excel usando file-saver
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'ganancias.xlsx');
}
}
