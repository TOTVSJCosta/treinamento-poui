import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSA1Component } from './edit-sa1.component';

describe('EditSA1Component', () => {
  let component: EditSA1Component;
  let fixture: ComponentFixture<EditSA1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSA1Component]
    });
    fixture = TestBed.createComponent(EditSA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
