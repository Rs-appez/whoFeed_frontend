import { Component, Input } from '@angular/core';
import { Champions } from '../../interfaces/champions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-champion',
  imports: [CommonModule],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.css',
})
export class ChampionComponent {
  @Input() champion!: Champions;

  url_image = 'https://ddragon.leagueoflegends.com/cdn/15.3.1/img/champion/';

  selectChampion() {
    this.champion.selected = !this.champion.selected;
  }
}
