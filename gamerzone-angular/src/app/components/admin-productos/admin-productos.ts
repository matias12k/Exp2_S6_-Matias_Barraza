import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CarritoService, Juego } from '../../services/carrito';

@Component({
  selector: 'app-admin-productos',
  standalone: true, // Componente autónomo moderno
  imports: [CommonModule, ReactiveFormsModule], // Importa herramientas de control reactivo
  templateUrl: './admin-productos.html',
  styleUrls: ['./admin-productos.css']
})
export class AdminProductosComponent implements OnInit {
  productForm!: FormGroup; // Control centralizado del formulario reactivo
  juegos: Juego[] = []; // Almacena la lista de videojuegos disponibles en la tienda

  constructor(private fb: FormBuilder, private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.juegos = this.carritoService.getJuegos(); // Carga la lista inicial desde el CarritoService
    
    // Inicializa el formulario con sus reglas de validación obligatorias para resguardar la consistencia de datos
    this.productForm = this.fb.group({
      titulo: ['', [Validators.required]], // Campo título obligatorio
      categoria: ['', [Validators.required]], // Campo categoría obligatorio
      precio: [0, [Validators.required, Validators.min(1)]] // Precio obligatorio mayor a cero
    });
  }

  guardarProducto(): void {
    if (this.productForm.valid) {
      alert('✓ ¡Juego procesado e integrado con éxito al inventario de GamerZone!');
      this.productForm.reset(); // Reinicia de forma segura los campos de texto del panel
    }
  }
}