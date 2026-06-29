import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarritoService, Juego } from '../../services/carrito';

@Component({
  selector: 'app-carrito',
  standalone: true, // Componente autónomo moderno
  imports: [CommonModule, RouterModule], // Carga herramientas de renderizado dinámico y enlaces de rutas
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent implements OnInit {
  items: Juego[] = []; // Lista interna de juegos que están en el carro
  total: number = 0; // Almacena el precio total acumulado de la orden

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    // Nos suscribimos al flujo Observable del carrito para escuchar cambios en tiempo real
    this.carritoService.carrito$.subscribe((res: Juego[]) => {
      this.items = res; // Sincroniza la lista de juegos agregados
      this.total = this.carritoService.obtenerTotal(); // Recalcula la suma matemática de los precios
    });
  }

  eliminar(id: number): void {
    this.carritoService.eliminarDelCarrito(id); // Remueve el juego usando el método inyectado del servicio
  }

  procederAlCheckout(): void {
  if (this.items.length > 0) {
    // Limpia el estado global del carrito al procesar el cobro
    this.carritoService.limpiarCarrito(); 
    // Redirige directamente al hito de pago exitoso aprobado
    this.router.navigate(['/pago-exitoso']); 
  }
}
}