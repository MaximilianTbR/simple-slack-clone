import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddNewUserComponent } from './dialog-add-new-user.component';

describe('DialogAddNewUserComponent', () => {
  let component: DialogAddNewUserComponent;
  let fixture: ComponentFixture<DialogAddNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddNewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
