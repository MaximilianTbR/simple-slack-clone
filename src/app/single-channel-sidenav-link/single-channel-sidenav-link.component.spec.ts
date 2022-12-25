import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChannelSidenavLinkComponent } from './single-channel-sidenav-link.component';

describe('SingleChannelSidenavLinkComponent', () => {
  let component: SingleChannelSidenavLinkComponent;
  let fixture: ComponentFixture<SingleChannelSidenavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleChannelSidenavLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleChannelSidenavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
