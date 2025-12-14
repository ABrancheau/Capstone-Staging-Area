import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalListing } from './animal-listing';

describe('AnimalListing', () => {
  let component: AnimalListing;
  let fixture: ComponentFixture<AnimalListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
