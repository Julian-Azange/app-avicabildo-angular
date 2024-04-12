import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
    private storageKey = 'claveLocalCompras';

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
        console.log('Datos antes de guardar en localStorage:', datos);
        localStorage.setItem(this.storageKey, JSON.stringify(datos));
        console.log('Dato guardado en localStorage');
    }
    

    // Elimina un dato por índice
    eliminarDato(index: number) {
        const datos = this.getDatos();
        datos.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(datos));
    }
}
