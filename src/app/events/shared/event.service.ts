import events from '../events.js';
import {EventEmitter, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IEvent, ISession} from './event.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';


@Injectable()
export class EventService {
    private EVENTS: IEvent[] = events;
    private index: any;

    constructor(private http: HttpClient) {

    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: store to error logs
            console.error(error);
            return of(result as T);
        };
    }

    public getEvents(): Observable<IEvent[]> {
        return this.http.get<IEvent[]>('/api/events')
            .pipe(catchError(this.handleError<IEvent[]>('getEvents', [])));
    }

    public getEvent(id: number): Observable<IEvent> {
        return this.http.get<IEvent>('/api/events/' + id)
            .pipe(catchError(this.handleError<IEvent>('getEvent')));
    }


    public saveEvent(event: IEvent): Observable<IEvent> {
        const options: object = {headers: new HttpHeaders({'Content-type': 'application/json'})};
        return this.http.post<IEvent>('/api/events/', event, options)
            .pipe(catchError(this.handleError<IEvent>('saveEvent')));
    }

    // TODO: add PUT
    // public updateEvent(event: IEvent): void {
    //     this.index = this.EVENTS.findIndex((x: IEvent) => x.id === event.id);
    //     this.EVENTS[this.index] = event;
    // }

    searchSessions(searchTerm: string): Observable<ISession[]> {
        return this.http.get<ISession[]>('/api/sessions/search?search=' + searchTerm)
            .pipe(catchError(this.handleError<ISession[]>('searchSessions')));

        // const term: string = searchTerm.toLocaleLowerCase();
        // let results: ISession[] = [];
        // this.EVENTS.forEach((event: IEvent) => {
        //     let matchingSessions: ISession[] = event.sessions
        //         .filter((session: ISession) =>
        //             session.name.toLowerCase().indexOf(term) > -1
        //         );
        //     matchingSessions = matchingSessions.map((session: ISession) => {
        //         session.id = event.id;
        //         return session;
        //     });
        //     results = results.concat(matchingSessions);
        // });
        // const emitter: EventEmitter<ISession[]> = new EventEmitter(true);
        // setTimeout(() => {
        //     emitter.emit(results);
        // }, 100);
        // return emitter;
    }
}

// const EVENTS: IEvent[] = events;
