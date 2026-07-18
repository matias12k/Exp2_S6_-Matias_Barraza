import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import { Component, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
class CarritoService {
  items: any[] = [];
  agregarAlCarrito(juego: any) {
    this.items.push(juego);
  }
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  template: '<div></div>'
})
class CarritoComponent {
  items: any[] = [];
  total: number = 0;
  constructor(private carritoService: CarritoService) {
    this.items = this.carritoService.items;
    this.actualizarTotal();
  }
  actualizarTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.precio, 0);
  }
}

describe('CarritoComponent (Pruebas Unitarias)', () => {
  let component: CarritoComponent;
  let service: CarritoService;

  beforeEach(() => {
    service = new CarritoService();
    component = new CarritoComponent(service);
  });

  it('Debería crear el componente del carro con éxito', () => {
    expect(component).toBeTruthy();
  });

  it('Debería calcular el total acumulado en $0 al estar vacío', () => {
    expect(component.total).toBe(0);
  });

  it('Debería actualizar los items cuando el servicio agrega un juego', () => {
    const juegoDemo = { id: 99, titulo: 'Juego Prueba', categoria: 'Acción', precio: 10000, imagen: '' };
    service.agregarAlCarrito(juegoDemo);
    component.items = service.items;
    component.actualizarTotal();
    expect(component.items.length).toBe(1);
    expect(component.total).toBe(10000);
  });
});