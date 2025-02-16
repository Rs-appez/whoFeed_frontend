import { Component, Input, Signal } from '@angular/core';
import { Party } from '../../interfaces/party';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waiting-party',
  imports: [CommonModule],
  templateUrl: './waiting-party.component.html',
  styleUrl: './waiting-party.component.css',
})
export class WaitingPartyComponent {
  @Input() party?: Signal<Party | null>;
}
