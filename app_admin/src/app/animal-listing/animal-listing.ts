import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnimalData } from '../services/animal-data';
import { Animal, Dog, Monkey } from '../models/animal';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-animal-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-listing.html',
  styleUrl: './animal-listing.css',
  providers: [AnimalData]
})
export class AnimalListing implements OnInit {
 
  animals!: any[];
  dogs!: Dog[];
  monkeys!: Monkey[];
  message: string = '';

 constructor(
  private animalDataService: AnimalData,
  private router: Router,
  private authenticationSerice: Authentication
  ) {
    console.log('animal-listing constructor');
  }

  public addDog(): void {
    this.router.navigate(['add-dog']);
  }
  public addMonkey(): void{
    this.router.navigate(['add-monkey']);
  }

  private getStuff(): void{
    this.animalDataService.getAnimals()
      .subscribe({
        next: (value: any) => {
          this.animals = value;

          if(value.length > 0){
            this.message = 'There are ' 
              + value.length + ' animals available.';
          }
          else{
            this.message = 'There were no animals retrieved from the database.';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
      

      this.animalDataService.getDogs()
      .subscribe({
        next: (value: any) => {
          this.dogs = value;

          if(value.length > 0){
            this.message = 'There are ' 
              + value.length + ' dogs available.';
          }
          else{
            this.message = 'There were no dogs retrieved from the database.';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });

      this.animalDataService.getMonkeys()
      .subscribe({
        next: (value: any) => {
          this.monkeys = value;

          if(value.length > 0){
            this.message = 'There are ' 
              + value.length + ' monkeys available.';
          }
          else{
            this.message = 'There were no monkeys retrieved from the database.';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  public editDog(dog: Dog) {
    localStorage.removeItem('animalCode');
    localStorage.setItem('animalCode', dog.code);
    this.router.navigate(['edit-dog']);
  }

  public editMonkey(monkey: Monkey) {
    localStorage.removeItem('animalCode');
    localStorage.setItem('animalCode', monkey.code);
    this.router.navigate(['edit-monkey']);
  }

  public isLoggedIn() {
    return this.authenticationSerice.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
