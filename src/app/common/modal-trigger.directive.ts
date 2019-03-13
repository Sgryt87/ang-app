import {Directive, ElementRef, Inject, Input, OnInit} from '@angular/core';
import {JQ_TOKEN} from './jQuery.service';

@Directive({
    selector: '[modalTrigger]'
})

export class ModalTriggerDirective implements OnInit {
    private el: HTMLElement;
    @Input('modalTrigger') modalId: string;

    constructor(@Inject(JQ_TOKEN) private $: any, _el: ElementRef) {
        this.el = _el.nativeElement;
    }

    ngOnInit(): void {
        this.el.addEventListener('click', () => {
            return this.$(`#${this.modalId}`).modal({});
        });
    }
}
