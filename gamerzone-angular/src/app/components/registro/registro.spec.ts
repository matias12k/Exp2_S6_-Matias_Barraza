import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: '<div></div>'
})
class RegistroComponent {
  registroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
}

try {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
} catch (error) {}

describe('RegistroComponent (Validación de Seguridad)', () => {
  let component: RegistroComponent;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, ReactiveFormsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);
    component = new RegistroComponent(fb);
  });

  it('Debería rechazar contraseñas que tengan menos de 8 caracteres', () => {
    const passwordControl = component.registroForm.get('password');
    passwordControl?.setValue('Gz*12'); 
    expect(passwordControl?.valid).toBeFalsy();
  });
});