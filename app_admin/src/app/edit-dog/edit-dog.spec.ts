import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDog } from './edit-dog';

describe('EditDog', () => {
  let component: EditDog;
  let fixture: ComponentFixture<EditDog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
