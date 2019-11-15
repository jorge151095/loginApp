import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _auth: AuthService,
               private _router: Router ) { }

  user: UserModel = new UserModel();
  remember = false;

  login( form: NgForm ) {
    if ( form.invalid ) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this._auth.signIn( this.user )
      .subscribe( res => {
        Swal.close();

        if ( this.remember ) {
          localStorage.setItem('email', this.user.email);
        }
        this._router.navigateByUrl('/home');
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticarse',
          text: err.error.error.message
        });
      });
  }

  ngOnInit() {
    if ( localStorage.getItem('email') ) {
      this.user.email = localStorage.getItem('email');
      this.remember = true;
    }
  }
}
