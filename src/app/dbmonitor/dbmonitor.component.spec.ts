import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbmonitorComponent } from './dbmonitor.component';

describe('DbmonitorComponent', () => {
  let component: DbmonitorComponent;
  let fixture: ComponentFixture<DbmonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DbmonitorComponent]
    });
    fixture = TestBed.createComponent(DbmonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
