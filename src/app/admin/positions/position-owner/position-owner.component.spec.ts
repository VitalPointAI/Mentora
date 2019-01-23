import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionOwnerComponent } from './position-owner.component';

describe('PositionOwnerComponent', () => {
  let component: PositionOwnerComponent;
  let fixture: ComponentFixture<PositionOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
