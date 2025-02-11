import { Component, Input } from '@angular/core';
import { Champion } from '../../interfaces/champions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-champion-display',
  imports: [],
  templateUrl: './champion-display.component.html',
  styleUrl: './champion-display.component.css',
})
export class ChampionDisplayComponent {
  url_image = environment.imageUrl;

  @Input() champion!: Champion;
}
