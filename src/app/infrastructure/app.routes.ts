import { Routes } from '@angular/router';
import { HomeComponent } from '../../home/presentation/components/home.component';
import { RoomComponent } from '../../room/presentation/components/room.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'rooms/:id',
        component: RoomComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
