import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationListComponent } from './attestation-list.component';

describe('AttestationListComponent', () => {
  let component: AttestationListComponent;
  let fixture: ComponentFixture<AttestationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
