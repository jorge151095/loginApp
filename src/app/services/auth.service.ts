import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _http: HttpClient) {
    this.getToken();
  }

  private _url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private _apiKey = 'AIzaSyCf4Y2i5rl_-1yMz-DdeBvKtDNkb6pMNmQ';

  public userToken: string;

  signOut() {
    localStorage.removeItem('token');
  }

  signIn( user: UserModel ) {
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this._http.post(
      `${this._url}signInWithPassword?key=${this._apiKey}`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  signUp( user: UserModel ) {
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this._http.post(
      `${this._url}signUp?key=${this._apiKey}`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  private saveToken( idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    const today = new Date();
    today.setSeconds( 3600 );
    localStorage.setItem('expire', today.getTime().toString());
  }

  public getToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated() {
    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expire = Number(localStorage.getItem('expire'));
    const expirationDate = new Date();
    expirationDate.setTime(expire);

    if ( expirationDate > new Date() ) {
      return true;
    } else {
      return false;
    }
  }
}
