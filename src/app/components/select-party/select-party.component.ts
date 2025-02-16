import { Component, inject } from '@angular/core';
import { PartyService } from '../../services/party.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-party',
  imports: [],
  templateUrl: './select-party.component.html',
  styleUrl: './select-party.component.css',
})
export class SelectPartyComponent {
  private readonly route = inject(Router);

  private partyService: PartyService = inject(PartyService);
  private localStorageService: LocalstorageService =
    inject(LocalstorageService);

  createParty() {
    this.partyService.makeParty().subscribe((party) => {
      this.localStorageService.set('party', party);
      this.route.navigate(['/board']);
    });
  }
}
