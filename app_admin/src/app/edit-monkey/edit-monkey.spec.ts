import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonkey } from './edit-monkey';

describe('EditMonkey', () => {
  let component: EditMonkey;
  let fixture: ComponentFixture<EditMonkey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMonkey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMonkey);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
