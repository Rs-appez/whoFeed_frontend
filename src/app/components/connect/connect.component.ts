import { Component, inject } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../player';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connect',
  imports: [FormsModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css',
})
export class ConnectComponent {
  // services
  playerService: PlayerService = inject(PlayerService);

  // variables
  player: Player | undefined;
  playerName: string = '';

  createPlayer() {
    if (this.playerName !== '') {
      this.playerService.makePlayer(this.playerName).subscribe((player) => {
        this.player = player;
        this.savePlayer();
      });
    }
  }

  savePlayer() {
    localStorage.setItem('player', JSON.stringify(this.player));
  }
}
