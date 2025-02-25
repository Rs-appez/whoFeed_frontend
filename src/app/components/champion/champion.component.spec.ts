import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionComponent } from './champion.component';

describe('ChampionComponent', () => {
  let component: ChampionComponent;
  let fixture: ComponentFixture<ChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
