import {
  Component,
  effect,
  inject,
  OnInit,
  Signal,
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
import { Party } from '../../interfaces/party';
import { PartyService } from '../../services/party.service';

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
  partyService: PartyService = inject(PartyService);

  //variables
  champions: WritableSignal<Champion[] | undefined> = signal<Champion[]>([]);

  filterChampions: WritableSignal<Champion[]> = signal<Champion[]>([]);

  guessChampion: Champion | undefined;
  guessChampionName: string = '';

  player: Player | null = {} as Player;
  party: Signal<Party | null> = this.partyService.party;

  isPartyReady = signal(false);

  constructor() {
    this.player = this.playerService.player();
    if (!this.player) {
      this.route.navigate(['/']);
    }

    // edit filterChampions when champions change
    effect(() => {
      const champions = this.champions();
      if (champions) {
        this.filterChampions.set([...champions]);
      }
    });

    // edit isPartyReady when party change
    effect(() => {
      this.checkPartyReady();
    });
  }

  ngOnInit() {
    this.championsService.getChampPool().subscribe((champions) => {
      this.champions.set(champions);
    });
  }
  checkPartyReady() {
    if (this.party()?.players.length === 2) {
      this.isPartyReady.set(true);
    } else {
      this.isPartyReady.set(false);
    }
  }
}
