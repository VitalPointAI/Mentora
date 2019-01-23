import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileFormComponent } from './public-profile-form.component';

describe('PublicProfileFormComponent', () => {
  let component: PublicProfileFormComponent;
  let fixture: ComponentFixture<PublicProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
