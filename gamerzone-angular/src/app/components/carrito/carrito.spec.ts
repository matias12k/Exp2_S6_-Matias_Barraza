import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoComponent } from './carrito';
import { CarritoService } from '../../services/carrito';
import { provideRouter } from '@angular/router';

describe('CarritoComponent (Pruebas Unitarias)', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;
  let service: CarritoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser componentes autónomos (standalone), se cargan en los imports
      imports: [CarritoComponent],
      providers: [
        CarritoService,
        provideRouter([]) // Inyecta rutas vacías para simular el enrutador
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CarritoService);
    fixture.detectChanges(); // Ejecuta el ciclo de vida inicial (ngOnInit)
  });

  // Prueba 1: Verifica que el componente compile e inicialice correctamente
  it('Debería crear el componente del carro con éxito', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 2: Verifica que la matemática del total funcione a través del servicio
  it('Debería calcular el total acumulado en $0 al estar vacío', () => {
    expect(component.total).toBe(0);
  });

  // Prueba 3: Simula añadir un juego y evalúa que el estado reaccione
  it('Debería actualizar los items cuando el servicio agrega un juego', () => {
    const juegoDemo = { id: 99, titulo: 'Juego Prueba', categoria: 'Acción', precio: 10000, imagen: '' };
    
    service.agregarAlCarrito(juegoDemo);
    fixture.detectChanges();

    expect(component.items.length).toBe(1);
    expect(component.total).toBe(10000);
  });
});