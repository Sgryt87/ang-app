import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    userName: string;
    password: string;
    mouseOverLogin: boolean;
    loginInvalid: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    login(formValues): void {
        this.authService.loginUser(formValues.userName, formValues.password)
            .subscribe((resp: any) => {
                if (!resp) {
                    this.loginInvalid = true;
                } else {
                    this.router.navigate(['events']);
                }
            });

    }

    cancel(): void {
        this.router.navigate(['events']);
    }
}
