import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {map} from 'rxjs/operators';
import {EventService} from './shared/event.service';
import {IEvent} from './shared';
import {Observable} from 'rxjs';

@Injectable()
export class EventsListResolver implements Resolve<any> {
    constructor(private eventService: EventService) {
    }

    resolve(): Observable<IEvent[]> {
        return this.eventService.getEvents();
    }
}
