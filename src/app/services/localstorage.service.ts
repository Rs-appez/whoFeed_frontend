import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PlayerService } from './player.service';
import { Player } from '../interfaces/player';
import { Party } from '../interfaces/party';
import { PartyService } from './party.service';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private readonly localStorage: Storage | undefined = undefined;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private playerService: PlayerService,
    private partyService: PartyService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.localStorage = this.document.defaultView?.localStorage;

      //add listener for storage event
      window.addEventListener('storage', this.storageEventListener.bind(this));

      //initialize data
      this.initializeData();
    }
  }

  private storageEventListener(event: StorageEvent) {
    if (event.key === 'player') {
      this.playerService.player.set(this.get('player'));
    } else if (event.key === 'party') {
      this.partyService.party.set(this.get('party'));
    }
  }

  private initializeData() {
    console.log('initializeData');
    //initialize player
    const player = this.get('player') as Player;
    console.log('player in localstorage', player);
    if (player) {
      console.log('player in if', player);
      this.playerService.player.set(player);
      console.log('player in service', this.playerService.player());
    }

    //initialize party
    const party = this.get('party') as Party;
    if (party) {
      this.partyService.party.set(party);
    }
  }

  get<T>(key: string): T | null {
    const item = this.localStorage?.getItem(key);

    if (!item) {
      return null;
    }

    return this.isJSONValid(item) ? (JSON.parse(item) as T) : (item as T);
  }

  set(key: string, value: unknown): void {
    if (!this.isBrowser) return;
    const oldValue = this.localStorage?.getItem(key);
    this.localStorage?.setItem(key, JSON.stringify(value));
    const event = new StorageEvent('storage', {
      key: key,
      newValue: JSON.stringify(value),
      oldValue: oldValue,
      storageArea: this.localStorage,
      url: window.location.href,
    });
    window.dispatchEvent(event);
  }

  remove(key: string): void {
    if (!this.isBrowser) return;
    const oldValue = this.localStorage?.getItem(key);
    this.localStorage?.removeItem(key);
    const event = new StorageEvent('storage', {
      key: key,
      newValue: null,
      oldValue: oldValue,
      storageArea: this.localStorage,
      url: window.location.href,
    });
    window.dispatchEvent(event);
  }

  removeKeys(keys: string[]): void {
    keys.forEach((key) => this.localStorage?.removeItem(key));
  }

  clear(): void {
    if (!this.isBrowser) return;
    this.localStorage?.clear();
    const event = new StorageEvent('storage', {
      key: null,
      newValue: null,
      oldValue: null,
      storageArea: this.localStorage,
      url: window.location.href,
    });
    window.dispatchEvent(event);
  }

  private isJSONValid(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}
