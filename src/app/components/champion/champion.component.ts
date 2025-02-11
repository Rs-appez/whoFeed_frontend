import { Component, Input } from '@angular/core';
import { Champions } from '../../interfaces/champions';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-champion',
  imports: [CommonModule],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.css',
})
export class ChampionComponent {
  @Input() champion!: Champions;

  url_image = environment.imageUrl;

  selectChampion() {
    this.champion.selected = !this.champion.selected;
  }
}
