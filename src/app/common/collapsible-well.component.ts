import {Component, Input} from '@angular/core';

@Component({
    selector: 'collapsible-well',
    templateUrl: './collapsible-well.component.html'
})
export class CollapsibleWellComponent {
    // @Input() title: string;
    visible = true;

    toggleContent(): void {
        this.visible = !this.visible;
    }
}
