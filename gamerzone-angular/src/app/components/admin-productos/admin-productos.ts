import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-productos.html',
  styleUrls: ['./admin-productos.css']
})
export class AdminProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoForm: FormGroup;
  isEditing = false;
  currentProductoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    // Inicialización del formulario reactivo con validaciones estrictas requeridas
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      imagen: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadProductos();
  }

  // GET: Cargar la lista desde Firebase
  // GET: Cargar la lista desde Firebase limpiando posiciones vacías
  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        // Filtramos para asegurar que el producto traiga un nombre válido
        this.productos = data.filter(prod => prod && prod.nombre);
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  // Guardar (POST o PUT dependiendo del estado)
  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const productoData: Producto = this.productoForm.value;

    if (this.isEditing && this.currentProductoId) {
      // PUT: Actualizar registro existente
      this.productoService.updateProducto(this.currentProductoId, productoData).subscribe({
        next: () => {
          this.resetForm();
          this.loadProductos();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      // POST: Crear nuevo registro
      this.productoService.addProducto(productoData).subscribe({
        next: () => {
          this.resetForm();
          this.loadProductos();
        },
        error: (err) => console.error('Error al guardar:', err)
      });
    }
  }

  // Preparar formulario para edición
  onEdit(producto: Producto): void {
    if (producto.id) {
      this.isEditing = true;
      this.currentProductoId = producto.id;
      this.productoForm.patchValue({
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        stock: producto.stock
      });
    }
  }

  // DELETE: Eliminar registro en Firebase
  onDelete(id: string | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar este videojuego de Gamer Zone?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => {
          this.loadProductos();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  resetForm(): void {
    this.productoForm.reset({ precio: 0, stock: 0 });
    this.isEditing = false;
    this.currentProductoId = null;
  }
}