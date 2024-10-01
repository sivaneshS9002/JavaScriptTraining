import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePopularityComponent } from './service-popularity.component';

describe('ServicePopularityComponent', () => {
  let component: ServicePopularityComponent;
  let fixture: ComponentFixture<ServicePopularityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePopularityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePopularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
