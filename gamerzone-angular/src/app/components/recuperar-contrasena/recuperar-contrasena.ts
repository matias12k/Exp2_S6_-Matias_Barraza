import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true, // Componente autónomo moderno
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Carga herramientas de validación y rutas
  templateUrl: './recuperar-contrasena.html',
  styleUrls: ['./recuperar-contrasena.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  recoverForm!: FormGroup; // Declara el control del formulario reactivo

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Configura el campo del correo electrónico con validación estricta
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Obligatorio y con formato de mail válido
    });
  }

  enviar(): void {
    if (this.recoverForm.valid) {
      // Feedback informativo simulando la operación de recuperación exitosa
      alert('✓ Se han enviado las instrucciones de recuperación a tu correo electrónico.');
      this.recoverForm.reset(); // Reinicia el campo de texto de forma segura
    }
  }
}