import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFloatingLabelComponent } from './ng-floating-label.component';

describe('NgFloatingLabelComponent', () => {
  let component: NgFloatingLabelComponent;
  let fixture: ComponentFixture<NgFloatingLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFloatingLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFloatingLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
