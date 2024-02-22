import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppmonitorComponent } from './appmonitor.component';

describe('AppmonitorComponent', () => {
  let component: AppmonitorComponent;
  let fixture: ComponentFixture<AppmonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppmonitorComponent]
    });
    fixture = TestBed.createComponent(AppmonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
