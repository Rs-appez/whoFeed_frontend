import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPartyComponent } from './waiting-party.component';

describe('WaitingPartyComponent', () => {
  let component: WaitingPartyComponent;
  let fixture: ComponentFixture<WaitingPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitingPartyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
