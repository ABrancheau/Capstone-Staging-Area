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
 
  // any[] lists allow use of Dog, Animal, and Monkey objects in the same list
  // message for logging database query results
  animals!: any[];
  filteredAnimals!: any[];
  message: string = '';

 constructor(
  private animalDataService: AnimalData,
  private router: Router,
  private authenticationSerice: Authentication
  ) {}

  // functions to allow adding animals using the appropriate component
  public addDog(): void {
    this.router.navigate(['add-dog']);
  }
  public addMonkey(): void{
    this.router.navigate(['add-monkey']);
  }

  // gets all animals in the order thatt they exist in in the database,
  // asynchronously
  private getStuff(): void{
    this.animalDataService.getAnimals()
      .subscribe({
        next: (value: any) => {
          this.animals = value;
          this.filteredAnimals = value;

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
  }

  // functions to edit an animal identified using the animalCode and 
  // specific edit component
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

  // filters shown animals by training status
  public filterResults(text: any){
    // if no text is input, show all animals
    if(!text){
      this.filteredAnimals = this.animals;
      return;
    }

    // otherwise, filter the list by training status, case insensitive
    this.filteredAnimals = this.animals.filter(animal =>
      animal?.trainingStatus.toLowerCase()
      .includes(text.toLowerCase())
    );
  }

  // public function for beginning mergesort. Takes a parameter to allow
  // future releases to include the option to sort by a different animal property
  public mergeSort(animalProperty: string) {
    
    if (animalProperty == "name"){
      // sets the displayed array to its sorted contents
      this.filteredAnimals = this.mergeSortName(this.filteredAnimals);
    }
  }

  // Merge sort function for splitting array adapted from w3schools' Java implementation:
  // https://www.w3schools.com/dsa/trydsa.php?filename=demo_mergesort
  private mergeSortName( animalArray: typeof this.filteredAnimals) : any[]{

    // if split to smallest size, stop splitting
    if (animalArray.length <= 1){
      return animalArray;
    }

    // find the middle, then create two sub lists containing half of the source array
    var middle = animalArray.length / 2;
    var leftHalf = animalArray.slice(0, middle);
    var rightHalf = animalArray.slice(middle, animalArray.length);

    // split each half into smaller sub arrays
    var sortedLeft = this.mergeSortName(leftHalf);
    var sortedRight = this.mergeSortName(rightHalf);

    // once split to single object lists, go to merge to merge them together in order
    // then, return the sorted array
    return this.merge(sortedLeft, sortedRight);
  }

  // Merge sort function for merging split arrays adapted from w3schools' Java implementation:
  // https://www.w3schools.com/dsa/trydsa.php?filename=demo_mergesort
  private merge (left: Animal[], right:Animal[]){
    // variable to store resulting list
    var result: Animal[] = [];

    // variables to iterate through the left, right, and result arrays
    var i = 0;
    var j = 0;
    var k = 0;

    // while there are more left and right elements,
    while(i < left.length && j < right.length){
      // if left comes first alphabetically, add left element to results array
      if(left[i].name < right[j].name){
        result[k++] = left[i++];
      }
      // else right comes first, add right element to results arrray
      else{
        result[k++] = right[j++];
      }
    }

    // if the left array still has elements remaining, add them to results
    while(i < left.length){
      result[k++] = left[i++];
    }

    // if the right side array has elements remaining, add them to results
    while(j < right.length){
      result[k++] = right[j++];
    }

    // return sorted array
    return result;
  }

  public isLoggedIn() {
    return this.authenticationSerice.isLoggedIn();
  }

  ngOnInit(): void {
    this.getStuff();
  }
}
