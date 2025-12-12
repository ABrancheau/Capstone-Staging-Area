import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Animal, Dog, Monkey } from '../models/animal';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root',
})

export class AnimalData {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}
  
  animalUrl = 'http://localhost:3000/api/animals';
  dogUrl = 'http://localhost:3000/api/dogs';
  monkeyUrl = 'http://localhost:3000/api/monkeys';
  baseUrl = 'http://localhost:3000/api';

  getAnimals(): Observable<any[]> {
    return this.http.get<any[]>(this.animalUrl);
  }
  addAnimal(formData: Animal) : Observable<Animal>{
    return this.http.post<Animal>(this.animalUrl, formData);
  }



  getDogs(): Observable<Dog[]>{
    return this.http.get<Dog[]>(this.dogUrl);
  }
  addDog(formData: Dog) : Observable<Dog>{
    return this.http.post<Dog>(this.dogUrl, formData);
  }

  getDog(animalCode: string) : Observable<Dog[]>{
    return this.http.get<Dog[]>(this.dogUrl + '/' + animalCode);
  }
  updateDog(formData: Dog) : Observable<Dog> {
    return this.http.put<Dog>(this.dogUrl + '/' + formData.code, formData);
  }


  
  getMonkeys(): Observable<Monkey[]>{
    return this.http.get<Monkey[]>(this.monkeyUrl);
  }
  addMonkey(formData: Monkey) : Observable<Monkey>{
    return this.http.post<Monkey>(this.monkeyUrl, formData);
  }

  getMonkey(animalCode: string) : Observable<Monkey[]>{
    return this.http.get<Monkey[]>(this.monkeyUrl + '/' + animalCode);
  }
  updateMonkey(formData: Monkey) : Observable<Monkey> {
    return this.http.put<Monkey>(this.monkeyUrl + '/' + formData.code, formData);
  }


  // Call to /login endpoint, returns JWT
  login(user: User, password: string) : Observable<AuthResponse> {
    // console.log('Inside AnimalDataService::login');
    return this.handleAuthAPICall('login', user, password);
  }
  // Call to /register endpoint, creates user and returns JWT
  register(user: User, password: string) : Observable<AuthResponse> {
    // console.log('Inside AnimalDataService::register');
    return this.handleAuthAPICall('register', user, password);
  }
  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, password: string) :
  Observable<AuthResponse> {
    // console.log('Inside AnimalDataService::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: password
    };
    
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint,
      formData);
  }
}
