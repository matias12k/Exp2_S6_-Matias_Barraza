import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true, // Componente autónomo moderno
  imports: [RouterModule], // Necesario para activar los enlaces de los botones de retorno
  templateUrl: './pago-exitoso.html',
  styleUrls: ['./pago-exitoso.css']
})
export class PagoExitosoComponent {
  // Genera un número de orden aleatorio de 5 dígitos para simular el recibo de compra
  numOrden = Math.floor(Math.random() * 90000) + 10000;
  
  // Captura la fecha del sistema formateada para Chile (DD-MM-AAAA)
  fechaActual = new Date().toLocaleDateString('es-CL');
}