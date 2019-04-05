import {VoterService} from './voter.service';
// import {HttpClient} from 'selenium-webdriver/http';
import {HttpClient} from '@angular/common/http';
import {ISession} from '../shared';
import {Observable, of} from 'rxjs';

describe('VoterService', () => {
    let voterService: VoterService, mockHttp: any;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {
        it('should remove a voter from the list of voters', () => {
            const session: ISession = <ISession>{
                id: 6,
                voters: ['joe', 'john']
            };
            const eventId = 3;
            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(eventId, <ISession>session, session.voters[0]);

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('john');
        });

        it('should call http.delete with the right URL', () => {
            const session: ISession = <ISession>{
                id: 6,
                voters: ['joe', 'john']
            };
            mockHttp.delete.and.returnValue(of(false));
            const eventId = 3;
            const deletedVoter = session.voters[0];

            voterService.deleteVoter(eventId, <ISession>session, session.voters[0]);

            expect(mockHttp.delete)
                .toHaveBeenCalledWith(`/api/events/${eventId}/sessions/${session.id}/voters/${deletedVoter}`);
        });
    });

    describe('addVoter', () => {
        it('should call http.post with the right URL', () => {
            const session: ISession = <ISession>{
                id: 6,
                voters: ['john']
            };
            mockHttp.post.and.returnValue(of(false));
            const eventId = 3;
            const addVoter = session.voters[0];

            voterService.addVoter(eventId, <ISession>session, session.voters[0]);

            expect(session.voters.length).toBe(2);
            expect(mockHttp.post)
                .toHaveBeenCalledWith(`/api/events/${eventId}/sessions/${session.id}/voters/${addVoter}`,
                    {},
                    jasmine.any(Object));

        });
    });

});
