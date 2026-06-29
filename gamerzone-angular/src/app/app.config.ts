import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // Usamos el token oficial estable para trabajar sin zone.js
    provideZonelessChangeDetection(), 
    
    // Inyecta el enrutador de las pantallas
    provideRouter(routes), 
    
    // Mantiene la hidratación activa
    provideClientHydration()
  ]
};