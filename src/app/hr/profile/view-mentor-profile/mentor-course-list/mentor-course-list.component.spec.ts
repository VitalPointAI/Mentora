import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorCourseListComponent } from './mentor-course-list.component';

describe('MentorCourseListComponent', () => {
  let component: MentorCourseListComponent;
  let fixture: ComponentFixture<MentorCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
