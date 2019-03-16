import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'up-vote',
    templateUrl: './upvote.component.html',
    styleUrls: ['./upvote.component.css']
})

export class UpvoteComponent {
    @Input() count: number;
    public iconColor: string;

    @Input() set voted(val) {
        this.iconColor = val ? 'red' : 'white';
    }

    @Output() vote: EventEmitter<any> = new EventEmitter();

    onClick(): void {
        this.vote.emit({});
    }
}
