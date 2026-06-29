import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true, // Indica que es un componente autónomo
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Módulos necesarios para formularios y navegación
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup; // Define el contenedor del formulario reactivo

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Inicializa el formulario y sus reglas estrictas de validación
    this.registroForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      // Contraseña configurada con las 4 reglas obligatorias de la rúbrica
      password: ['', [
        Validators.required,
        Validators.minLength(8), // Regla 1: Mínimo 8 caracteres
        Validators.maxLength(18), // Regla 2: Máximo 18 caracteres
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])/), // Regla 3: Combinar mayúsculas y minúsculas
        Validators.pattern(/(?=.*[!@#$%^&*])/) // Regla 4: Incluir un carácter especial
      ]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      rol: ['cliente', Validators.required] // Control de privilegios (Cliente/Admin)
    });
  }

  onRegister(): void {
    if (this.registroForm.valid) {
      // Guarda los datos simulados en el LocalStorage para usarlos en el Login
      localStorage.setItem('newUser', JSON.stringify(this.registroForm.value));
      alert('✓ ¡Cuenta creada con éxito! Redirigiendo al login...');
      this.router.navigate(['/login']); // Redirige automáticamente al componente Login
    }
  }
}