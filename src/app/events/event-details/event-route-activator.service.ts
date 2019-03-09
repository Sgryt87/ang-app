import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {EventService} from '../shared/event.service';

@Injectable()
export class EventRouteActivator implements CanActivate {
    constructor(private router: Router, private eventService: EventService) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const eventExists = !!this.eventService.getEvent(+route.params['id']);

        if (!eventExists) {
            this.router.navigate(['/404']);
        }
        return eventExists;
    }
}
