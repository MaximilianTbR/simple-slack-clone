import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmDialogComponent } from './dm-dialog.component';

describe('DmDialogComponent', () => {
  let component: DmDialogComponent;
  let fixture: ComponentFixture<DmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
