import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay, tap, map} from 'rxjs/operators';
import {Credentials} from '../models/credentials';
import {LocalStorageConst} from '../localStorage-const';
import {Router} from '@angular/router';

export interface Token {
  id_token: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  apiURL: string = environment.apiURL;

  private subject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.isLoggedIn$ = this.user$.pipe(map((loggedUser: Credentials) => !!loggedUser));
    this.isLoggedOut = this.user$.pipe(map((loggedIn: Credentials) => !loggedIn));

    const user = localStorage.getItem(LocalStorageConst.token);
    if (user) {
      this.subject.next(user);
    }
  }

  // Login
  logIn(credentials: Credentials): Observable<Token> {
    const endPoint = this.apiURL + '/api/authenticate';
    return this.http.post<Token>(endPoint, credentials).pipe(
      tap((loggedInUser: Token) => {
        this.subject.next(loggedInUser);
        localStorage.setItem(LocalStorageConst.token, loggedInUser.id_token);
      }),
      shareReplay(),
    );
  }

  // Get logged user
  getUser(): Observable<any> {
    return this.http.get(`${this.apiURL}/api/account`).pipe(
      shareReplay()
    );
  }

  // Logout
  logOut(): void {
    this.subject.next(null);
    this.router.navigate(['']);
    localStorage.removeItem(LocalStorageConst.token);
  }
}

