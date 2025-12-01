import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Animal } from '../models/animal';


@Injectable({
  providedIn: 'root',
})

export class AnimalData {

  constructor(private http: HttpClient) {}
  
  url = 'http://localhost:3000/api/animals';

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.url);
  }
}
