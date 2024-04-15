import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    private datos: any[] = [];

    constructor() {
        this.cargarDatosDesdeLocalStorage();
    }

    agregarDato(nuevoDato: any) {
        this.datos.push(nuevoDato);
        this.guardarDatosEnLocalStorage();
    }

    obtenerDatos(): any[] {
        return this.datos;
    }

    eliminarDato(indice: number) {
        if (indice >= 0 && indice < this.datos.length) {
            this.datos.splice(indice, 1);
            this.guardarDatosEnLocalStorage();
        }
    }

    guardarDatosEnLocalStorage() {
        localStorage.setItem('datosVentas', JSON.stringify(this.datos));
    }

    cargarDatosDesdeLocalStorage() {
        const datosGuardados = localStorage.getItem('datosVentas');
        if (datosGuardados) {
            this.datos = JSON.parse(datosGuardados);
        }
    }
}
