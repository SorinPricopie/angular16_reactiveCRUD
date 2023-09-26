import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
export interface UserCredentials {
  username: string;
  pwd: string;
}

const userCredentials: UserCredentials = {
  username: '1234',
  pwd: '1234',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isAuthenticated = false;

  constructor(private readonly router: Router) {}

  logIn(data: UserCredentials): void {
    const correctCredentials =
      data.username === userCredentials.username &&
      data.pwd === userCredentials.pwd;

    this.isAuthenticatedSubject.next(correctCredentials ? true : false);

    if (correctCredentials) {
      this.isAuthenticated = true;
      this.router.navigateByUrl('/reactive-crud');
    }
  }
}
