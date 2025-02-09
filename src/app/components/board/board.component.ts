import { Component, inject, Signal, signal } from '@angular/core';
import { ChampionsService } from '../../services/champions.service';
import { Champions } from '../../interfaces/champions';
import { ChampionComponent } from '../champion/champion.component';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board',
  imports: [CommonModule, ChampionComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  //services
  championsService: ChampionsService = inject(ChampionsService);

  //variables
  champions: Signal<Champions[] | undefined> = signal<Champions[]>([]);

  constructor() {
    this.champions = toSignal(this.championsService.getChampPool());
  }
}
