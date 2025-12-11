import { Routes } from '@angular/router';
import { AddDog } from './add-Dog/add-dog';
import { AddMonkey } from './add-monkey/add-monkey';
import { AnimalListing } from './animal-listing/animal-listing';
import { EditDog } from './edit-dog/edit-dog';
import { EditMonkey } from './edit-monkey/edit-monkey';

export const routes: Routes = [
    {path: 'add-dog', component: AddDog},
    {path: 'add-monkey', component: AddMonkey},
    {path: 'edit-dog', component: EditDog},
    {path: 'edit-monkey', component: EditMonkey},
    {path: '', component: AnimalListing, pathMatch:'full'}
];
