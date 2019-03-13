import events from '../events.js';
import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IEvent, ISession} from './event.model';


@Injectable()
export class EventService {
    private EVENTS: IEvent[] = events;
    private index: any;

    public getEvents(): Observable<IEvent[]> {
        const subject: Subject<IEvent[]> = new Subject<IEvent[]>();
        setTimeout(() => {
            subject.next(this.EVENTS);
            subject.complete();
        }, 100);
        return subject;
    }

    public getEvent(id: number): IEvent {
        return this.EVENTS.find((event: IEvent) => event.id === id);
    }

    public saveEvent(event: IEvent): void {
        event.id = 999;
        event.sessions = [];
        this.EVENTS.push(event);
    }

    public updateEvent(event: IEvent): void {
        this.index = this.EVENTS.findIndex((x: IEvent) => x.id === event.id);
        this.EVENTS[this.index] = event;
    }

    searchSessions(searchTerm: string) {
        const term: string = searchTerm.toLocaleLowerCase();
        let results: ISession[] = [];
        this.EVENTS.forEach((event: IEvent) => {
            let matchingSessions: ISession[] = event.sessions
                .filter((session: ISession) =>
                    session.name.toLowerCase().indexOf(term) > -1
                );
            matchingSessions = matchingSessions.map((session: ISession) => {
                session.id = event.id;
                return session;
            });
            results = results.concat(matchingSessions);
        });
        const emitter: EventEmitter<ISession[]> = new EventEmitter(true);
        setTimeout(() => {
            emitter.emit(results);
        }, 100);
        return emitter;
    }
}

// const EVENTS: IEvent[] = events;
