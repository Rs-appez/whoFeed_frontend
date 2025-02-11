import { Component, Input, signal, WritableSignal } from '@angular/core';
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
  @Input() filterChampions: WritableSignal<Champions[]> = signal<Champions[]>(
    [],
  );
  url_image = environment.imageUrl;

  selectChampion() {
    this.champion.selected = !this.champion.selected;
    if (this.champion.selected) {
      this.filterChampions.update((champions: Champions[]) => {
        return champions?.filter((champ) => champ.id !== this.champion.id);
      });
    } else {
      this.filterChampions.update((champions: Champions[]) => {
        return champions?.concat(this.champion);
      });
    }
  }
}
