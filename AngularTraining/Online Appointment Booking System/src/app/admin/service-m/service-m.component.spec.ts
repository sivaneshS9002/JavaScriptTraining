import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMComponent } from './service-m.component';

describe('ServiceMComponent', () => {
  let component: ServiceMComponent;
  let fixture: ComponentFixture<ServiceMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
