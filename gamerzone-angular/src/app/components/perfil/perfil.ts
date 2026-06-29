import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Clave para que funcionen los formGroup
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  profileForm!: FormGroup; // Contenedor del formulario reactivo

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializamos el formulario con datos de ejemplo y validaciones obligatorias
    this.profileForm = this.fb.group({
      nombre: ['Juan Pérez', [Validators.required, Validators.minLength(3)]],
      tag: ['GamerPro_123', [Validators.required]],
      email: ['cliente@gamerzone.com', [Validators.required, Validators.email]]
    });
  }

  guardarPerfil(): void {
    if (this.profileForm.valid) {
      alert('✓ Tus cambios de perfil fueron guardados con éxito en la base de datos.');
    }
  }
}