import { Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ConnectComponent } from './components/connect/connect.component';
import { SelectPartyComponent } from './components/select-party/select-party.component';

export const routes: Routes = [
  {
    path: '',
    component: ConnectComponent,
  },
  {
    path: 'party',
    component: SelectPartyComponent,
  },
  {
    path: 'board',
    component: BoardComponent,
  },
];
