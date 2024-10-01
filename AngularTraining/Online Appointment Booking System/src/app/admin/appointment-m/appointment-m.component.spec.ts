import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentMComponent } from './appointment-m.component';

describe('AppointmentMComponent', () => {
  let component: AppointmentMComponent;
  let fixture: ComponentFixture<AppointmentMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
