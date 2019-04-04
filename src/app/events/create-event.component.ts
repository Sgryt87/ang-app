import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService, IEvent} from './shared';

@Component({
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {
    isDirty: boolean = true;
    event: IEvent;

    constructor(private router: Router, private eventService: EventService) {

    }

    saveEvent(formValues: IEvent): void {
        this.eventService.saveEvent(formValues).subscribe(() => {
            this.isDirty = false;
            this.router.navigate(['/events']);
        });
    }

    cancel(): void {
        this.router.navigate(['/events']);
    }

    ngOnInit(): void {
        // this.event = {
        //     id: 22,
        //     name: 'NG SPEC',
        //     date: new Date('8/8/2088'),
        //     time: '8am',
        //     price: 333,
        //     imageUrl: 'http://ngspectacular.com/logo.png',
        //     location: {
        //         address: '44 Some st',
        //         city: 'Some',
        //         country: 'ZZ'
        //     },
        //     onlineUrl: 'http://ngspectacular.com',
        // };
    }

}
