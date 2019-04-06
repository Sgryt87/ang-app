import {Component} from '@angular/core';
import {AuthService} from '../user/auth.service';
import {EventService, ISession} from '../events/shared';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {
    private searchTerm = '';
    public foundSessions: ISession[];

    constructor(private auth: AuthService, private eventService: EventService) {

    }

    searchSessions(searchTerm: string): void {
        this.eventService.searchSessions(searchTerm)
            .subscribe((sessions: ISession[]) => {
                    this.foundSessions = sessions;
                }
            );
    }
}
