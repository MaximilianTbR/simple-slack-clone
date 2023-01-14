import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMessageComponent } from './single-message.component';

describe('SingleMessageComponent', () => {
  let component: SingleMessageComponent;
  let fixture: ComponentFixture<SingleMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
