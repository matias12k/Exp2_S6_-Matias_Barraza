import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Definimos la estructura exacta que tiene un videojuego
export interface Juego {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class CarritoService {
  
  // Lista fija con tu catálogo original de la Semana 3
  private juegos: Juego[] = [
    { id: 1, titulo: 'Elden Ring', precio: 59990, imagen: 'assets/elden-ring.jpg', categoria: 'accion' },
    { id: 2, titulo: "Baldur's Gate 3", precio: 59990, imagen: 'assets/baldurs-gate.jpg', categoria: 'rpg' },
    { id: 3, titulo: 'The Legend of Zelda', precio: 69990, imagen: 'assets/zelda.jpg', categoria: 'aventura' },
    { id: 4, titulo: 'Starfield', precio: 69990, imagen: 'assets/starfield.jpg', categoria: 'accion' },
    { id: 5, titulo: 'Final Fantasy XVI', precio: 69990, imagen: 'assets/ffxvi.jpg', categoria: 'rpg' }
  ];

  // Arreglo privado para guardar los juegos que el usuario va comprando
  private carrito: Juego[] = [];

  // El BehaviorSubject avisa automáticamente a los componentes cuando el carrito cambia
  private carritoSubject = new BehaviorSubject<Juego[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {}

  // Método para que el Catálogo obtenga la lista de juegos
  getJuegos(): Juego[] {
    return this.juegos;
  }

  // Método para agregar un juego al carrito y notificar el cambio
  agregarAlCarrito(juego: Juego): void {
    this.carrito.push(juego);
    this.carritoSubject.next([...this.carrito]); // Enviamos la copia actualizada
  }

  // Método para sacar un juego del carrito usando su ID
  eliminarDelCarrito(id: number): void {
    this.carrito = this.carrito.filter(item => item.id !== id);
    this.carritoSubject.next([...this.carrito]); // Notificamos el cambio
  }

  // Método matemático para calcular la suma de los precios del carro
  obtenerTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio, 0);
  }

  // Método para vaciar el carrito cuando el pago sea exitoso
  limpiarCarrito(): void {
    this.carrito = [];
    this.carritoSubject.next([]);
  }
}