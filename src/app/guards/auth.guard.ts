import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _auth: AuthService,
               private _router: Router ) {}

  canActivate(): boolean {
    if (this._auth.isAuthenticated()) {
      return true;
    } else {
      this._router.navigateByUrl('/login');
      return false;
    }
  }
}
