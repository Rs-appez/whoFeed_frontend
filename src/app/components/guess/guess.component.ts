import { Component, Input, signal, WritableSignal } from '@angular/core';
import { ChampionDisplayComponent } from '../champion-display/champion-display.component';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Champion } from '../../interfaces/champions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guess',
  imports: [CommonModule, ChampionDisplayComponent, SearchPipe, FormsModule],
  templateUrl: './guess.component.html',
  styleUrl: './guess.component.css',
})
export class GuessComponent {
  @Input() filterChampions: WritableSignal<Champion[]> = signal<Champion[]>([]);
  @Input() guessChampion: Champion | undefined;

  guessChampionName: string = '';

  selectChampion(champion: Champion) {
    this.guessChampion = champion;
  }

  sortedChampions(): Champion[] {
    return this.filterChampions().sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
}
