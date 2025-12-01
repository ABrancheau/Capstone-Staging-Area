import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalData } from '../services/animal-data';
// import { Animal } from '../models/animal';

import { animals } from '../data/animals';

@Component({
  selector: 'app-animal-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-listing.html',
  styleUrl: './animal-listing.css',
  providers: [AnimalData]
})
export class AnimalListing implements OnInit{
  
  animals: Array<any> = animals;
  
  constructor() {}

  ngOnInit(): void {
    
  }
/*animals!: Animal[];
  message: string = '';

 constructor(private animalDataService: AnimalData){
    console.log('animal-listing constructor');
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
      })
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }*/
}
