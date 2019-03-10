import {Component, Input} from '@angular/core';
import {ISession} from '../shared';

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html',
    styleUrls: []
})
export class SessionListComponent {
    @Input() sessions: ISession[];
}
