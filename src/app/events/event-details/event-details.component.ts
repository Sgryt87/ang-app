import {Component, OnInit} from '@angular/core';
import {EventService} from '../shared/event.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
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
                private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.data.forEach((data: IEvent) => {
            this.event = data['event'];
            this.addMode = false;
        });
        // this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }

    public addSession(): void {
        this.addMode = true;
    }

    public saveNewSession(session: ISession): void {
        this.nextId = Math.max.apply(null, this.event.sessions
            .map((s: ISession) => s.id));
        session.id = +this.nextId + 1;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event)
            .subscribe();
        this.addMode = false;
    }

    cancelAddSession(): void {
        this.addMode = false;
    }


}
