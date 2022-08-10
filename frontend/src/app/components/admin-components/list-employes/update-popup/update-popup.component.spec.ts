import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePopupComponent } from './update-popup.component';

describe('UpdatePopupComponent', () => {
  let component: UpdatePopupComponent;
  let fixture: ComponentFixture<UpdatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
