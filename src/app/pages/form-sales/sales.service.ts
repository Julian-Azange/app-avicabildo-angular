import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    private storageKey = 'claveLocalVentas';

    constructor() { }

    // Obtiene datos desde el localStorage
    getDatos() {
        const cachedData = localStorage.getItem(this.storageKey);
        return cachedData ? JSON.parse(cachedData) : [];
    }

    // Guarda un nuevo dato en el localStorage
    guardarDato(dato: any) {
        const datos = this.getDatos();
        datos.push(dato);
        localStorage.setItem(this.storageKey, JSON.stringify(datos));
    }

    // Elimina un dato por índice
    eliminarDato(index: number) {
        const datos = this.getDatos();
        datos.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(datos));
    }
}
