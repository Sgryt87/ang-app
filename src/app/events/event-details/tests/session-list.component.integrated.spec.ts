import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SessionListComponent} from '../session-list.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {AuthService} from '../../../user/auth.service';
import {VoterService} from '../voter.service';
import {UpvoteComponent} from '../upvote.component';
import {DurationPipe} from '../../shared';
import {CollapsibleWellComponent} from '../../../common';
import {By} from '@angular/platform-browser';

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debug: DebugElement;

    beforeEach(async () => {
        const mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {
                userName: 'Joe'
            }
        }, mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                // UpvoteComponent, // -> NO_ERRORS_SCHEMA
                // CollapsibleWellComponent, // -> NO_ERRORS_SCHEMA
                DurationPipe
            ],
            providers: [
                {provide: AuthService, useValue: mockAuthService},
                {provide: VoterService, useValue: mockVoterService},
            ],
            schemas: [
                NO_ERRORS_SCHEMA // ignore unrecognized elements and properties, to exclude children testing dependencies
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        debug = fixture.debugElement;
    });

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [
                {
                    id: 3,
                    name: 'Session 1',
                    presenter: 'Joe',
                    duration: 1,
                    level: 'advanced',
                    abstract: 'abstract',
                    voters: ['john', 'bob']
                }
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent)
                .toContain('Session 1');
        });
    });

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [
                {
                    id: 3,
                    name: 'Session 1',
                    presenter: 'Joe',
                    duration: 1,
                    level: 'advanced',
                    abstract: 'abstract',
                    voters: ['john', 'bob']
                }
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent)
                .toContain('Session 1');
            expect(debug.query(By.css('[well-title]'))
                .nativeElement.textContent).toContain('Session 1');
        });
    });
});
