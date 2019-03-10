import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {IUser} from './user.model';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    private firstName: FormControl;
    private lastName: FormControl;

    constructor(private authService: AuthService, private router: Router) {
    }


    ngOnInit(): void {

        this.firstName = new FormControl(this.authService.currentUser.firstName,
            [Validators.required, Validators.pattern('[a-zA-Z].*')]);
        this.lastName = new FormControl(this.authService.currentUser.lastName,
            Validators.required);
        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        });
    }

    saveProfile(formValues): void {
        if (this.profileForm.valid) {
            console.log('v', formValues);
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
            this.router.navigate(['events']);
        }
    }

    cancel(): void {
        this.router.navigate(['events']);
    }

    validateFirstName(): boolean {
        return this.firstName.valid || this.firstName.untouched;
    }

    validateLastName(): boolean {
        return this.lastName.valid || this.lastName.untouched;
    }
}
