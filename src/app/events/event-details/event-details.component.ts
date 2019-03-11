import {Component, OnInit} from '@angular/core';
import {EventService} from '../shared/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IEvent, ISession} from '../shared';

@Component({
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})

export class EventDetailsComponent implements OnInit {
    public event: IEvent;
    public addMode: boolean;
    private nextId: any;
    public filterBy: string = 'all';
    public sortBy: string = 'votes';

    constructor(private eventService: EventService,
                private route: ActivatedRoute,
                private router: Router
    ) {

    }

    ngOnInit(): void {
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }

    public addSession(): void {
        this.addMode = true;
    }

    public saveNewSession(session: ISession): void {
        // TODO: redirect to specific session back
        this.nextId = Math.max.apply(null, this.event.sessions
            .map(s => s.id));
        session.id = +this.nextId + 1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }


}
