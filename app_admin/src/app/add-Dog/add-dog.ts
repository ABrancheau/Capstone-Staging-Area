import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalData } from '../services/animal-data';

@Component({
  selector: 'app-add-dog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-dog.html',
  styleUrl: './add-dog.css',
})
export class AddDog implements OnInit{
  public addDogForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private animalService: AnimalData
  ){}

  // animalType is preset to Dog, with the html input field in the form set to
  // read only, ensuring proper animal type set
  ngOnInit() {
    this.addDogForm = this.formBuilder.group({
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
      animalType: ['Dog', Validators.required],
      breed: ['', Validators.required]
    })
  }

  // Validates, then sends Dog data to the database
  public onSubmitDog() {
    this.submitted = true;

    if(this.addDogForm.valid){
      this.animalService.addDog(this.addDogForm.value)
        .subscribe({
          next: (data: any) => {
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  // function for managing form controls in the html
  get f() {return this.addDogForm.controls;}

}
