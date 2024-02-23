import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseappComponent } from './closeapp.component';

describe('CloseappComponent', () => {
  let component: CloseappComponent;
  let fixture: ComponentFixture<CloseappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseappComponent]
    });
    fixture = TestBed.createComponent(CloseappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
