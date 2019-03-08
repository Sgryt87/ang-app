import {Component, OnInit} from '@angular/core';
import {EventService} from './shared/event.service';
import {ToasterService} from '../common/toaster.service';

@Component({
    selector: 'events-list',
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
    events: any[];

    constructor(private eventService: EventService, private toastr: ToasterService) {
    }

    handleThumbnailClick(eventName) {
        this.toastr.success(eventName);
    }

    ngOnInit() {
        this.events = this.eventService.getEvents();
    }
}
