import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnimalData } from '../services/animal-data';
import { Animal, Dog } from '../models/animal';


@Component({
  selector: 'app-edit-dog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-dog.html',
  styleUrl: './edit-dog.css',
})
export class EditDog {

  public editDogForm!: FormGroup;
  dog!: Dog;
  submitted = false;
  message : string = '';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private animalDataService: AnimalData
  ) {}

  ngOnInit(): void {

    // retrieve stashed animal ID
    let animalCode = localStorage.getItem("animalCode");
    if(!animalCode) {
      alert("Something wrong, could not find where animalCode is stashed.");
      this.router.navigate(['']);
      return;
    }

    console.log('EditDog::ngOnInit');
    console.log('animalcode:' + animalCode);

    this.editDogForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      reserved: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      acquisitionDate: ['', Validators.required],
      acquisitionCountry: ['', Validators.required],
      trainingStatus: ['', Validators.required],
      inServiceCountry: ['', Validators.required],
      animalType: ['', Validators.required],
      breed: ['', Validators.required]
    })

    this.animalDataService.getDog(animalCode)
      .subscribe({
        next: (value: any) => {
          this.dog = value;
          this.editDogForm.patchValue(value[0]);
          if(!value) {
            this.message = 'No dog retrieved.';
          }
          else {
            this.message = 'Dog: ' + animalCode + ' retrieved'; 
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  public onSubmitDog() {
    this.submitted = true;

    if(this.editDogForm.valid) {
      this.animalDataService.updateDog(this.editDogForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }
  }

  get f() { return this.editDogForm.controls;}

}
