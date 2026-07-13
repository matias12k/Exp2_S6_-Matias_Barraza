import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Producto {
  id?: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://gamer-zone-duoc-default-rtdb.firebaseio.com/.json';

  constructor(private http: HttpClient) { }

  // GET: Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<{ [key: string]: Producto }>(this.apiUrl).pipe(
      map(responseData => {
        const productosArray: Producto[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            productosArray.push({ ...responseData[key], id: key });
          }
        }
        return productosArray;
      })
    );
  }

  // POST: Agregar un nuevo producto
  addProducto(producto: Producto): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  // PUT: Modificar un producto existente
  updateProducto(id: string, producto: Producto): Observable<any> {
    const urlIndividual = `https://gamer-zone-duoc-default-rtdb.firebaseio.com/productos/${id}.json`;
    return this.http.put(urlIndividual, producto);
  }

  // DELETE: Eliminar un producto
  deleteProducto(id: string): Observable<any> {
    const urlIndividual = `https://gamer-zone-duoc-default-rtdb.firebaseio.com/productos/${id}.json`;
    return this.http.delete(urlIndividual);
  }
}