import events from '../events.js';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IEvent} from './event.model';


@Injectable()
export class EventService {
    private EVENTS: IEvent[] = events;
    private index: any;

    public getEvents(): Observable<IEvent[]> {
        const subject = new Subject<IEvent[]>();
        setTimeout(() => {
            subject.next(this.EVENTS);
            subject.complete();
        }, 100);
        return subject;
    }

    public getEvent(id: number): IEvent {
        return this.EVENTS.find(event => event.id === id);
    }

    public saveEvent(event: IEvent): void {
        event.id = 999;
        event.sessions = [];
        this.EVENTS.push(event);
    }

    public updateEvent(event: IEvent): void {
        this.index = this.EVENTS.findIndex(x => x.id === event.id);
        this.EVENTS[this.index] = event;
    }
}

// const EVENTS: IEvent[] = events;
