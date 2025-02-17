import { Component, inject } from '@angular/core';
import { PartyService } from '../../services/party.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';
import { Party } from '../../interfaces/party';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-party',
  imports: [FormsModule],
  templateUrl: './select-party.component.html',
  styleUrl: './select-party.component.css',
})
export class SelectPartyComponent {
  private readonly route = inject(Router);

  private partyService: PartyService = inject(PartyService);
  private localStorageService: LocalstorageService =
    inject(LocalstorageService);

  party: Party | null = {} as Party;

  partyId: string = '';

  constructor() {
    this.party = this.partyService.party();
    if (this.party) {
      this.route.navigate(['/board']);
    }
  }

  createParty() {
    this.partyService.makeParty().subscribe((party) => {
      this.party = party;
      this.connectParty();
    });
  }

  joinParty() {
    this.partyService.joinParty(this.partyId).subscribe((party) => {
      this.party = party;
      this.connectParty();
    });
  }

  connectParty() {
    this.localStorageService.set('party', this.party);
    this.route.navigate(['/board']);
  }
}
