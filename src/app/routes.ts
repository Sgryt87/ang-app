import {Routes} from '@angular/router';
import {Error404Component} from './errors/404.component';

import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventsListResolver,
    CreateSessionComponent, EventResolver
} from './events';

export const appRoutes: Routes = [
    {
        path: 'events/new', component: CreateEventComponent,
        canDeactivate: ['canDeactivateCreateEvent']
    },
    {
        path: 'events', component: EventsListComponent,
        resolve: {events: EventsListResolver}
    },
    {
        path: 'events/:id', component: EventDetailsComponent,
        resolve: {event: EventResolver}
    },
    {path: 'events/session/new', component: CreateSessionComponent},
    {path: '404', component: Error404Component},
    {path: '', redirectTo: '/events', pathMatch: 'full'},
    // user routes
    {path: 'user', loadChildren: './user/user.module#UserModule'}
];
