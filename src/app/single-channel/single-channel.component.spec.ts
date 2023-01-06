import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChannelComponent } from './single-channel.component';

describe('SingleChannelComponent', () => {
  let component: SingleChannelComponent;
  let fixture: ComponentFixture<SingleChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
