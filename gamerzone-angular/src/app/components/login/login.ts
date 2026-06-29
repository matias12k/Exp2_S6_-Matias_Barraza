import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // Componente autónomo moderno
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Carga herramientas de validación y navegación
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Instancia el contenedor del formulario reactivo

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Configura los campos del inicio de sesión y sus validaciones básicas
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Correo obligatorio con formato correcto
      password: ['', [Validators.required, Validators.minLength(6)]], // Contraseña obligatoria
      rol: ['cliente', Validators.required] // Captura el rol seleccionado (cliente/admin)
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password, rol } = this.loginForm.value;
      
      // Control de privilegios exigido por la pauta: Redirección diferenciada por rol
      if (rol === 'admin') {
        alert('⚙️ Modo Administrador detectado. Entrando al panel de gestión...');
        this.router.navigate(['/admin-productos']); // Redirige al mantenedor de inventario
      } else {
        alert('🎮 ¡Bienvenido a GamerZone!');
        this.router.navigate(['/catalogo']); // Redirige al catálogo de compras del cliente
      }
    }
  }
}