import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LossesService {

    constructor() { }

    // Obtiene datos desde el localStorage según la clave dada
    getDatos(storageKey: string) {
        const cachedData = localStorage.getItem(storageKey);
        return cachedData ? JSON.parse(cachedData) : [];
    }

    // Guarda un nuevo dato en el localStorage según la clave dada
    guardarDato(dato: any, storageKey: string) {
        const datos = this.getDatos(storageKey);
        datos.push(dato);
        localStorage.setItem(storageKey, JSON.stringify(datos));
    }

    // Elimina un dato por índice y clave de almacenamiento
    eliminarDato(index: number, storageKey: string) {
        const datos = this.getDatos(storageKey);
        datos.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(datos));
    }
}
