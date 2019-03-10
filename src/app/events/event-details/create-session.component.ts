import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ISession, RestrictedInputsValidator} from '../shared';

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html',
    styleUrls: ['./create-session.component.css']
})

export class CreateSessionComponent implements OnInit {
    @Output() saveNewSession: EventEmitter<ISession> = new EventEmitter();
    @Output() cancelAddSession: EventEmitter<any> = new EventEmitter();
    public name: FormControl;
    public presenter: FormControl;
    public duration: FormControl;
    public level: FormControl;
    public abstract: FormControl;
    public newSessionForm: FormGroup;
    public session: ISession;


    ngOnInit(): void {
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required,
            Validators.maxLength(400),
            RestrictedInputsValidator.restrictedInput(['foo', 'bar'])]);

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        });
    }

    saveSession(formValues: ISession): void {
        this.session = {
            name: formValues.name,
            presenter: formValues.presenter,
            duration: +formValues.duration,
            level: formValues.level,
            abstract: formValues.abstract
        };
        this.saveNewSession.emit(this.session);
    }

    cancel(): void {
        this.cancelAddSession.emit();
    }
}
