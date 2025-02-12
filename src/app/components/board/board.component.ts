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
import { Player } from '../../interfaces/player';
import { ChampionComponent } from '../champion/champion.component';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { GuessComponent } from '../guess/guess.component';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  imports: [CommonModule, ChampionComponent, GuessComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  private readonly route = inject(Router);

  //services
  championsService: ChampionsService = inject(ChampionsService);
  localStorageService: LocalstorageService = inject(LocalstorageService);

  //variables
  champions: Signal<Champion[] | undefined> = signal<Champion[]>([]);

  filterChampions: WritableSignal<Champion[]> = signal<Champion[]>([]);

  guessChampion: Champion | undefined;
  guessChampionName: string = '';

  player: Player = {} as Player;

  constructor() {
    let player = this.localStorageService.get<Player>('player');
    if (player) {
      this.player = player;
    } else {
      this.route.navigate(['/']);
    }

    this.champions = toSignal(this.championsService.getChampPool());

    effect(() => {
      const champions = this.champions();
      if (champions) {
        this.filterChampions.set([...champions]);
      }
    });
  }
}
