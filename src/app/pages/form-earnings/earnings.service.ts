/* 
    Este servicio ofrece las siguientes funcionalidades:

    Obtener datos de localStorage según la clave proporcionada.
    Calcular los totales de compras, ventas y pérdidas.
    Calcular la ganancia total.
    Borrar los datos almacenados en localStorage para una clave específica.
*/


import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EarningsService {

    // private storageKey = 'claveLocalGanancias';

    constructor() { }

    public getData(key: string): any[] {
        return JSON.parse(localStorage.getItem(key) || '[]');
    }

    calcularTotalTabla(key: string): number {
        const data = this.getData(key);
        return data.reduce((total, item) => total + parseFloat(item.valor), 0);
    }

    calcularGanancia(): number {
        const totalCompras = this.calcularTotalTabla('claveLocalCompras');
        const totalVentas = this.calcularTotalTabla('claveLocalVentas');
        const totalPerdidas = this.calcularTotalTabla('claveLocalPerdidas');
        return totalVentas - (totalCompras + totalPerdidas);

    }

    // Método para guardar el último dato de ganancia en `localStorage`
    guardarGanancias(item: string, fecha: string, ganancia: number): void {
        // Crear un objeto con el último dato de ganancia
        const ultimaGanancia = {
            item,
            fecha,
            ganancia
        };

        // Sobrescribir el dato existente en `localStorage`
        localStorage.setItem('claveLocalGanancias', JSON.stringify([ultimaGanancia]));
    }

    borrarDatos(key: string): void {
        localStorage.removeItem(key);
    }
}
