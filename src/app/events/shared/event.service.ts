import events from '../events.js';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IEvent} from './event.model';


@Injectable()
export class EventService {
    getEvents(): Observable<IEvent[]> {
        const subject = new Subject<IEvent[]>();
        setTimeout(() => {
            subject.next(EVENTS);
            subject.complete();
        }, 100);
        return subject;
    }

    getEvent(id: number): IEvent {
        return EVENTS.find(event => event.id === id);
    }
}

const EVENTS: IEvent[] = events;
