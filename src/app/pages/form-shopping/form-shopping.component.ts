import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalDatosComponent } from '../../components/modal-datos/modal-datos.component';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-form-shopping',
  templateUrl: './form-shopping.component.html',
  styleUrls: ['./form-shopping.component.css']
})
export class FormShoppingComponent implements OnInit {

  form: FormGroup;
  datos: any[] = [];
  totalValor: number = 0;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private shoppingService: ShoppingService, // Inyecta el servicio
    private dialog: MatDialog // Inyecta MatDialog
  ) {
    this.form = this.fb.group({
      item: [{ value: this.calcularSiguienteItem(), disabled: true }], // `item` inicializado automáticamente
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.min(1), Validators.required]],
      valor: ['', Validators.required],
      observaciones: ['']
    });

  }

  ngOnInit() {
    // Cargar datos usando la storageKey correcta
    this.datos = this.shoppingService.getDatos(this.getStorageKey());
    this.calcularTotal();
  }

  enviarDatos() {
    if (this.form.valid) {
      const nuevoDato = this.form.value;

      // Guardar el nuevo dato usando la clave correcta
      this.shoppingService.guardarDato(nuevoDato, this.getStorageKey());

      // Agregar el nuevo dato a la lista de datos
      this.datos.push(nuevoDato);

      // Calcular el total después de agregar el nuevo dato
      this.calcularTotal();

      // Recalcular el valor del siguiente `item` y actualizar el formulario
      this.form.patchValue({ item: this.calcularSiguienteItem() });

      // Restablecer el resto del formulario
      this.form.reset({
        item: this.calcularSiguienteItem()
      });

      // Mostrar los datos actualizados
      this.mostrarDatos();
    } else {
      console.log('Formulario no válido');
    }
  }


  calcularTotal() {
    this.totalValor = this.datos.reduce((total, dato) => total + dato.valor, 0);
  }

  // Método para eliminar un dato
  eliminarDato(index: number) {
    const datoEliminado = this.datos.splice(index, 1)[0];

    // Eliminar dato usando la storageKey correcta
    this.shoppingService.eliminarDato(index, this.getStorageKey());

    this.calcularTotal();
  }

  mostrarDatos() {
    this.dialog.open(ModalDatosComponent, {
      data: {
        datos: this.datos,
        totalValor: this.totalValor,
        storageKey: this.getStorageKey()
      }
    });
  }

  calcularSiguienteItem(): number {
    // Obtener los datos existentes de compras
    const datos = this.shoppingService.getDatos(this.getStorageKey());

    // Si no hay datos, el primer item es 1
    if (datos.length === 0) {
      return 1;
    }

    // Extraer los valores de los ítems existentes
    const items = datos.map((dato: { item: number }) => dato.item);


    // Encontrar el máximo valor de ítem y sumar 1 para obtener el siguiente valor
    const maxItem = Math.max(...items);

    // Retornar el siguiente ítem
    return maxItem + 1;
  }


  goBack() {
    this.location.back();
  }

  private getStorageKey(): string {
    return 'claveLocalCompras'; // Clave de almacenamiento específica para el formulario de compras
  }
}
