import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingeChannelComponent } from './singe-channel.component';

describe('SingeChannelComponent', () => {
  let component: SingeChannelComponent;
  let fixture: ComponentFixture<SingeChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingeChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingeChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
