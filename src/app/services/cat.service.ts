import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Cat } from '../models/cat.model';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private apiUrl = 'https://api.thecatapi.com/v1/images/search';
  private apiKey = 'live_76VN31ijROn6zlznMfeqys7JeYmW1RzJXWMdgxiaZULR1fBfSkTBycrwNxTXrgj4';
  private cats: Cat[] = [];

  constructor(private http: HttpClient) { }

  // Obtener gatos desde la API
   fetchCatsFromApi(limit: number = 15, breed: number = 1): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${this.apiUrl}?api_key=${this.apiKey}&limit=${limit}&has_breeds=${breed}}`).pipe(
      tap((cats: Cat[]) => {
        this.cats = cats;
        this.saveCats();
      })
    );;
  }

  // Obtener gatos en memoria
  getCats(): Cat[] {
    const storedCats = localStorage.getItem('cats');
    if (storedCats) {
      this.cats = JSON.parse(storedCats);
    }
    return this.cats;
  }

  // Obtener un gato por ID
  getCatById(id: string): Cat | undefined {
    return this.cats.find(cat => cat.id === id);
  }

  // Agregar un gato
  addCat(cat: Cat): void {
    this.cats.push(cat);
    this.saveCats();
  }

  // Actualizar un gato
  updateCat(updatedCat: Cat): void {
    const index = this.cats.findIndex(cat => cat.id === updatedCat.id);
    if (index !== -1) {
      this.cats[index] = updatedCat;
      this.saveCats();
    }
  }

  // Eliminar un gato
  deleteCat(id: string): void {
    this.cats = this.cats.filter(cat => cat.id !== id);
    this.saveCats();
  }

  // Guardar gatos en localStorage
  private saveCats(): void {
    if (!localStorage.getItem('cats')) {
      localStorage.setItem('orignalCats', JSON.stringify(this.cats));
    }
    localStorage.setItem('cats', JSON.stringify(this.cats));
  }

  // Restaur los gatos originales desde localStorage
  resetCats(): void {
    this.cats = JSON.parse(localStorage.getItem('orignalCats') || '[]');
    this.saveCats();
  }
}
