import events from '../events.js';
import {Injectable} from '@angular/core';


@Injectable()
export class EventService {
    getEvents() {
        return EVENTS;
    }
}

const EVENTS = events;
