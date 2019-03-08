import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    template: `
        <div class="well hoverwell thumbnail">
            <h2>{{event?.name}}</h2>
            <div>Date: {{event?.date}}</div>
            <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
                Time: {{event?.time}}
                <span *ngSwitchCase="'8:00 am'">(Early)</span>
                <span *ngSwitchCase="'10:00 am'">(Late)</span>
                <span *ngSwitchDefault>(Normal)</span>
            </div>
            <div>Price: {{event?.price}}</div>
            <div *ngIf="event?.location">
                <span>Location: {{event?.location.address}}</span>
                <span class="pad-left">{{event?.location.city}}, {{event?.location.country}}</span>
            </div>
            <div *ngIf="event?.onlineUrl">
                Online URL: {{event?.onlineUrl}}
            </div>
        </div>
    `,
    styles: [`
        .green {
            color: green !important;
        }

        .bold {
            font-weight: bold;
        }

        .pad-left {
            margin-left: 10px;
        }

        .well div {
            color: #bbb;
        }

        .thumbnail {
            min-height: 210px;
        }
    `
    ]
})

export class EventThumbnailComponent {
    @Input() event: any; // event(data) passed form parent

    getStartTimeClass() {
        // #1
        // const isEarlyStart = this.event && this.event.time === '8:00 am';
        // return {green: isEarlyStart, bold: isEarlyStart};
        // #2
        return this.event && this.event.time === '8:00 am' ? ['green', 'bold'] : [];
    }
}
