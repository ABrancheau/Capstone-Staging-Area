import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonkey } from './add-monkey';

describe('AddMonkey', () => {
  let component: AddMonkey;
  let fixture: ComponentFixture<AddMonkey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMonkey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMonkey);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
