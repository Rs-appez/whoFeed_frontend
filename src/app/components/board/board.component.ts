import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ChampionsService } from '../../services/champions.service';
import { Champion } from '../../interfaces/champions';
import { Player } from '../../interfaces/player';
import { ChampionComponent } from '../champion/champion.component';
import { CommonModule } from '@angular/common';
import { GuessComponent } from '../guess/guess.component';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-board',
  imports: [CommonModule, ChampionComponent, GuessComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  private readonly route = inject(Router);

  //services
  championsService: ChampionsService = inject(ChampionsService);
  playerService: PlayerService = inject(PlayerService);

  //variables
  champions: WritableSignal<Champion[] | undefined> = signal<Champion[]>([]);

  filterChampions: WritableSignal<Champion[]> = signal<Champion[]>([]);

  guessChampion: Champion | undefined;
  guessChampionName: string = '';

  player: Player | null = {} as Player;

  constructor() {
    this.player = this.playerService.player();
    if (!this.player) {
      this.route.navigate(['/']);
    }

    effect(() => {
      const champions = this.champions();
      if (champions) {
        this.filterChampions.set([...champions]);
      }
    });
  }

  ngOnInit() {
    this.championsService.getChampPool().subscribe((champions) => {
      this.champions.set(champions);
    });
  }
}
