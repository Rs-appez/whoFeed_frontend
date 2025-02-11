import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionDisplayComponent } from './champion-display.component';

describe('ChampionDisplayComponent', () => {
  let component: ChampionDisplayComponent;
  let fixture: ComponentFixture<ChampionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
