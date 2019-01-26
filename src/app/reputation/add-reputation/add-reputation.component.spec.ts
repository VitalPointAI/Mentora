import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReputationComponent } from './add-reputation.component';

describe('AddReputationComponent', () => {
  let component: AddReputationComponent;
  let fixture: ComponentFixture<AddReputationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReputationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
