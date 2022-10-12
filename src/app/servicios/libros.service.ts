import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  url: string = 'http://localhost:3000/libros';

  constructor(
    
    private http: HttpClient

  ) { }

  get(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.url);
    
  }

  post(libro: Libro): Observable<any>{
    return this.http.post(this.url, libro, { responseType: 'text' });
  }

  put(libro: Libro, idactual: number): Observable<any>{
    return this.http.put(`${this.url}/${idactual}`, libro, { responseType: 'text' })
  }

  delete(libro: Libro): Observable<any>{
    return this.http.delete(`${this.url}/${libro.id}`, { responseType: 'text' });
  }

}
