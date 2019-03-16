import {Injectable} from '@angular/core';
import {ISession} from '../shared';

@Injectable()
export class VoterService {

    deleteVoter(session: ISession, voterName: string): void {
        session.voters = session.voters
            .filter((voter: string) => voter !== voterName);
    }

    addVoter(session: ISession, voterName: string): void {
        session.voters.push(voterName);
    }

    userHasVoted(session: ISession, voterName: string): boolean {
        return session.voters
            .some((voter: string) => voter === voterName);
    }
}
