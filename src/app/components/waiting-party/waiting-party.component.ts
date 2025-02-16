import { Component, Input } from '@angular/core';
import { Party } from '../../interfaces/party';

@Component({
  selector: 'app-waiting-party',
  imports: [],
  templateUrl: './waiting-party.component.html',
  styleUrl: './waiting-party.component.css',
})
export class WaitingPartyComponent {
  @Input() party: Party | null = null;
}
