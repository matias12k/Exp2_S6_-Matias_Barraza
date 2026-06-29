import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarritoService, Juego } from '../../services/carrito';

@Component({
  selector: 'app-catalogo-juegos',
  standalone: true, // Componente autónomo
  imports: [CommonModule, FormsModule, RouterModule], // Carga herramientas de iteración, formularios sencillos y rutas
  templateUrl: './catalogo-juegos.html',
  styleUrls: ['./catalogo-juegos.css']
})
export class CatalogoJuegosComponent implements OnInit {
  juegosCompletos: Juego[] = []; // Almacena la lista total desde el servicio
  juegosFiltrados: Juego[] = []; // Lista mutada que se muestra en el HTML

  // Variables vinculadas a los selectores mediante [(ngModel)] para los filtros
  filtroCategoria: string = '';
  ordenarPor: string = 'popular';

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    // Recupera los juegos definidos en el CarritoService al arrancar el componente
    this.juegosCompletos = this.carritoService.getJuegos();
    this.aplicarFiltros(); // Renderiza la lista inicial
  }

  aplicarFiltros(): void {
    let resultado = [...this.juegosCompletos];

    // Cláusula de filtrado por categoría (Acción, RPG, Aventura...)
    if (this.filtroCategoria) {
      resultado = resultado.filter(j => j.categoria.toLowerCase() === this.filtroCategoria.toLowerCase());
    }

    // Cláusula de ordenamiento por precio
    if (this.ordenarPor === 'price-asc') {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (this.ordenarPor === 'price-desc') {
      resultado.sort((a, b) => b.precio - a.precio);
    }

    this.juegosFiltrados = resultado; // Asigna el resultado final a la rejilla
  }

  agregarAlCarro(juego: Juego): void {
    this.carritoService.agregarAlCarrito(juego); // Invoca el método del servicio global
    alert(`¡${juego.titulo} agregado al carrito con éxito! 🛒`);
  }
}