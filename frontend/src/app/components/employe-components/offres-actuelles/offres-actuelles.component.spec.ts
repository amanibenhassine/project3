import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresActuellesComponent } from './offres-actuelles.component';

describe('OffresActuellesComponent', () => {
  let component: OffresActuellesComponent;
  let fixture: ComponentFixture<OffresActuellesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffresActuellesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffresActuellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
