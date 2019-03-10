import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NavBarComponent} from './nav/navbar.component';
import {ToasterService} from './common/toaster.service';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {Error404Component} from './errors/404.component';
import {EventsAppComponent} from './events-app.component';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventsListResolver,
    CreateSessionComponent
} from './events';

import {AuthService} from './user/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent
    ],
    providers: [
        EventService,
        ToasterService,
        EventRouteActivator,
        EventsListResolver,
        {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}, // TODO: refactor
        AuthService
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component: CreateEventComponent): boolean {
    if (component.isDirty) {
        return window.confirm(`You haven't saved this event, do you want to cancel and loose all data?`);
    }
    return true;
}
