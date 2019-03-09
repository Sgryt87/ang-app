import {Component, OnInit} from '@angular/core';
import {EventService} from './shared/event.service';
import {ToasterService} from '../common/toaster.service';
import {ActivatedRoute} from '@angular/router';
import {IEvent} from './shared';

@Component({
    template: `
        <div>
            <h1>Upcoming Angular Events</h1>
            <hr>
            <div class="row" *ngIf="events">
                <div class="col-md-5" *ngFor="let event of events">
                    <event-thumbnail
                            (click)="handleThumbnailClick(event.name)"
                            [event]="event">
                    </event-thumbnail>
                </div>
            </div>
        </div>
    `
})

export class EventsListComponent implements OnInit {
    events: IEvent[];

    constructor(private eventService: EventService,
                private toastr: ToasterService,
                private route: ActivatedRoute) {
    }

    handleThumbnailClick(eventName) {
        this.toastr.success(eventName);
    }

    ngOnInit() {
        // replaced with resolver in routes
        // this.eventService.getEvents().subscribe(
        //     events => {
        //         this.events = events;
        //     }
        // );

        this.events = this.route.snapshot.data['events']; // ['events'] -> matches resolve:{events:'...'}
    }
}
