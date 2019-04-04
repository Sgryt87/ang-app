import {Inject, Injectable} from '@angular/core';
import {IUser} from './user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
import {IToastr, TOASTR_TOKEN} from '../common';

@Injectable()
export class AuthService {
    currentUser: IUser;

    constructor(private http: HttpClient) {

    }

    loginUser(userName: string, password: string): Observable<IUser> {
        const loginInfo: object = {username: userName, password: password};
        const options: object = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.post('/api/login', loginInfo, options)
            .pipe(tap((data: any) => {
                this.currentUser = <IUser>data['user'];
            }))
            .pipe(catchError((err: any) => {
                return of(false);
            }));
    }

    isAuthenticated(): boolean {
        return !!this.currentUser;
    }

    checkAuthenticationStatus(): void {
        this.http.get('/api/currentIdentity')
            .pipe(tap((data: any) => {
                if (data instanceof Object) {
                    this.currentUser = <IUser>data;
                }
            }))
            .subscribe();
    }

    updateCurrentUser(firstName: string, lastName: string): Observable<object> {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
        const options: object = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }

    logout(): Observable<object> {
        this.currentUser = null;

        const options: object = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.post('/api/logout/', {}, options);
    }
}

