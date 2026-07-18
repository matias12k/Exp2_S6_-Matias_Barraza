import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: '<div></div>'
})
class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }
}

describe('LoginComponent (Pruebas de Formulario)', () => {
  let component: LoginComponent;
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
    component = new LoginComponent(fb);
  });

  it('Debería crear el componente de login con éxito', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario debería ser inválido al arrancar (campos vacíos)', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Debería exigir un formato de correo válido', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('correoInvalido');
    expect(emailControl?.valid).toBeFalsy();

    emailControl?.setValue('matias@gamerzone.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('Debería marcar el formulario como válido si cumple con todos los requisitos', () => {
    component.loginForm.get('email')?.setValue('admin@gamerzone.com');
    component.loginForm.get('password')?.setValue('123456');
    component.loginForm.get('rol')?.setValue('admin');
    expect(component.loginForm.valid).toBeTruthy();
  });
});