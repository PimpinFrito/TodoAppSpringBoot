import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersTasksComponent } from './all-users-tasks.component';

describe('AllUsersTasksComponent', () => {
  let component: AllUsersTasksComponent;
  let fixture: ComponentFixture<AllUsersTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUsersTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUsersTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
