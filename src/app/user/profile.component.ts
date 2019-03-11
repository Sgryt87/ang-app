import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {IToastr, TOASTR_TOKEN} from '../common/toaster.service';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    firstName: FormControl;
    lastName: FormControl;

    constructor(private authService: AuthService,
                private router: Router,
                @Inject(TOASTR_TOKEN) private toastr: IToastr) {
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
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
            this.router.navigate(['events']);
            this.toastr.success('Profile Saved');
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
