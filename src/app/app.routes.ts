import { Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ConnectComponent } from './components/connect/connect.component';

export const routes: Routes = [
  {
    path: '',
    component: ConnectComponent,
  },
  {
    path: 'board',
    component: BoardComponent,
  },
];
