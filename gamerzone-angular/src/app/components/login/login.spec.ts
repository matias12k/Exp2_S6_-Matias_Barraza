import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

describe('LoginComponent (Pruebas de Formulario)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente de login con éxito', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario debería ser inválido al arrancar (campos vacíos)', () => {
    expect(component.loginForm.valid).toBeFalsy(); // <-- Cambiado para Vitest
  });

  it('Debería exigir un formato de correo válido', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('correoInvalido');
    expect(emailControl?.valid).toBeFalsy(); // <-- Cambiado para Vitest

    emailControl?.setValue('matias@gamerzone.com');
    expect(emailControl?.valid).toBeTruthy(); // <-- Cambiado para Vitest
  });

  it('Debería marcar el formulario como válido si cumple con todos los requisitos', () => {
    component.loginForm.get('email')?.setValue('admin@gamerzone.com');
    component.loginForm.get('password')?.setValue('123456');
    component.loginForm.get('rol')?.setValue('admin');

    expect(component.loginForm.valid).toBeTruthy(); // <-- Cambiado para Vitest
  });
});