import { Component, Input } from '@angular/core';
import { Champions } from '../../interfaces/champions';

@Component({
  selector: 'app-champion',
  imports: [],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.css',
})
export class ChampionComponent {
  @Input() champion!: Champions;
}
