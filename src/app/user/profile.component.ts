import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {IToastr, TOASTR_TOKEN} from '../common/toaster.service';
import {IUser} from './user.model';

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

    saveProfile(formValues: IUser) {
        console.log(formValues);
        if (this.profileForm.valid) {
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
                .subscribe(() => {
                    this.toastr.success('Profile Saved');
                });
            // this.router.navigate(['events']);
        }
    }

    logout(): void {
        this.authService.logout()
            .subscribe(() => {
                this.router.navigate(['/user/login']);
            });
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
