import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChampionsService } from '../../services/champions.service';
import { Champions } from '../../interfaces/champions';
import { ChampionComponent } from '../champion/champion.component';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchPipe } from '../../pipes/search.pipe';
import { ChampionDisplayComponent } from '../champion-display/champion-display.component';

@Component({
  selector: 'app-board',
  imports: [
    CommonModule,
    ChampionComponent,
    FormsModule,
    SearchPipe,
    ChampionDisplayComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  //services
  championsService: ChampionsService = inject(ChampionsService);

  //variables
  champions: Signal<Champions[] | undefined> = signal<Champions[]>([]);

  filterChampions: Signal<Champions[] | undefined> = signal<Champions[]>([]);

  guessChampion: Champions | undefined;
  guessChampionName: string = '';

  constructor() {
    this.champions = toSignal(this.championsService.getChampPool());
    this.filterChampions = this.champions;
  }

  selectChampion(champion: Champions) {
    this.guessChampion = champion;
  }
}
