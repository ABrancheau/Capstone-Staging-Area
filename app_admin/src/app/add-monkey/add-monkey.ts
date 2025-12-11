import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalData } from '../services/animal-data';

@Component({
  selector: 'app-add-monkey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-monkey.html',
  styleUrl: './add-monkey.css',
})
export class AddMonkey implements OnInit{
  public addMonkeyForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private animalService: AnimalData
  ){}

  ngOnInit() {
    this.addMonkeyForm = this.formBuilder.group({
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
  }

  public onSubmitMonkey() {
    this.submitted = true;

    if(this.addMonkeyForm.valid){
      this.animalService.addMonkey(this.addMonkeyForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  get f() {return this.addMonkeyForm.controls;}

}
