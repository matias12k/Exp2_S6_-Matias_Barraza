import { Routes } from '@angular/router';

// 1. Importaciones de los componentes de acceso y cuenta
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena';
import { Perfil } from './components/perfil/perfil'; // <-- Cambiado a 'Perfil' para solucionar tu error

// 2. Importaciones de la lógica de negocio de la tienda GamerZone
import { CatalogoJuegosComponent } from './components/catalogo-juegos/catalogo-juegos';
import { CarritoComponent } from './components/carrito/carrito';
import { AdminProductosComponent } from './components/admin-productos/admin-productos';
import { PagoExitosoComponent } from './components/pago-exitoso/pago-exitoso';

// Definición de la matriz de rutas para la navegación de la app
export const routes: Routes = [
  // Ruta por defecto: Redirige automáticamente al catálogo al abrir la aplicación
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  
  // Rutas del cliente (Tienda y cuenta)
  { path: 'catalogo', component: CatalogoJuegosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'perfil', component: Perfil }, // <-- Enlazado correctamente a la clase existente
  
  // Rutas de los formularios reactivos de acceso
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperarContrasenaComponent },
  
  // Rutas de administración e hitos del flujo
  { path: 'admin-productos', component: AdminProductosComponent },
  { path: 'pago-exitoso', component: PagoExitosoComponent },
  
  // Comodín (Wildcard): Si el usuario escribe cualquier otra ruta inexistente, lo devuelve al catálogo
  { path: '**', redirectTo: 'catalogo' }
];