import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnimalData } from '../services/animal-data';
import { Animal, Monkey } from '../models/animal';

@Component({
  selector: 'app-edit-monkey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-monkey.html',
  styleUrl: './edit-monkey.css',
})
export class EditMonkey implements OnInit{
  public editMonkeyForm!: FormGroup;
  monkey!: Monkey;
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

    console.log('EditMonkey::ngOnInit');
    console.log('animalcode:' + animalCode);

    this.editMonkeyForm = this.formBuilder.group({
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
      tailLength: ['', Validators.required],
      bodyHeight: ['', Validators.required],
      bodyLength: ['', Validators.required],
      species: ['', Validators.required]
    })

    this.animalDataService.getMonkey(animalCode)
      .subscribe({
        next: (value: any) => {
          this.monkey = value;
          this.editMonkeyForm.patchValue(value[0]);
          if(!value) {
            this.message = 'No monkey retrieved.';
          }
          else {
            this.message = 'Monkey: ' + animalCode + ' retrieved'; 
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  public onSubmitMonkey() {
    this.submitted = true;

    if(this.editMonkeyForm.valid) {
      this.animalDataService.updateMonkey(this.editMonkeyForm.value)
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

  get f() { return this.editMonkeyForm.controls; }

}
