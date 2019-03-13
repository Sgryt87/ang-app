import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IEvent} from './shared';

@Component({
    selector: 'event-thumbnail',
    templateUrl: './event-thumbnail.component.html',
    styleUrls: ['./event-thumbnail.component.css']
})

export class EventThumbnailComponent {
    @Input() event: IEvent; // event(data) passed form parent

    getStartTimeClass(): string[] {
        // #1
        // const isEarlyStart = this.event && this.event.time === '8:00 am';
        // return {green: isEarlyStart, bold: isEarlyStart};
        // #2
        return this.event && this.event.time === '8:00 am' ? ['green', 'bold'] : [];
    }
}
