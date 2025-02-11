import {
  Component,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ChampionsService } from '../../services/champions.service';
import { Champion } from '../../interfaces/champions';
import { ChampionComponent } from '../champion/champion.component';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { GuessComponent } from '../guess/guess.component';

@Component({
  selector: 'app-board',
  imports: [CommonModule, ChampionComponent, GuessComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  //services
  championsService: ChampionsService = inject(ChampionsService);

  //variables
  champions: Signal<Champion[] | undefined> = signal<Champion[]>([]);

  filterChampions: WritableSignal<Champion[]> = signal<Champion[]>([]);

  guessChampion: Champion | undefined;
  guessChampionName: string = '';

  constructor() {
    this.champions = toSignal(this.championsService.getChampPool());

    effect(() => {
      const champions = this.champions();
      if (champions) {
        this.filterChampions.set([...champions]);
      }
    });
  }
}
