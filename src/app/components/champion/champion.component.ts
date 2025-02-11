import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Champion } from '../../interfaces/champions';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-champion',
  imports: [CommonModule],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.css',
})
export class ChampionComponent {
  @Input() champions!: Champion[];
  @Input() filterChampions: WritableSignal<Champion[]> = signal<Champion[]>([]);
  url_image = environment.imageUrl;

  selectChampion(champion: Champion) {
    champion.selected = !champion.selected;
    if (champion.selected) {
      this.filterChampions.update((champions: Champion[]) => {
        return champions?.filter((champ) => champ.id !== champion.id);
      });
    } else {
      this.filterChampions.update((champions: Champion[]) => {
        return champions?.concat(champion);
      });
    }
  }
}
