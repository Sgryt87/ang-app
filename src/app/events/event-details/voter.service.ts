import {Injectable} from '@angular/core';
import {ISession} from '../shared';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class VoterService {
    constructor(private http: HttpClient) {

    }

    deleteVoter(session: ISession, eventId: number, voterName: string): void {
        session.voters = session.voters
            .filter((voter: string) => voter !== voterName);
        const url: string = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.delete(url)
            .pipe(catchError(this.handleError('deleteVoter')))
            .subscribe();
    }

    addVoter(eventId: number, session: ISession, voterName: string): void {
        session.voters.push(voterName);

        const url: string = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        const options: object = {headers: new HttpHeaders({'Content-type': 'application/json'})};
        this.http.post(url, {}, options)
            .pipe(catchError(this.handleError('addVoter')))
            .subscribe(); // called in session list
    }

    userHasVoted(session: ISession, voterName: string): boolean {
        return session.voters
            .some((voter: string) => voter === voterName);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: store to error logs
            console.error(error);
            return of(result as T);
        };
    }
}
