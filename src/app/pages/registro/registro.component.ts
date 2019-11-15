import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _router: Router) { }

  user: UserModel;
  remember = false;

  onSubmit( form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this._auth.signUp( this.user )
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
    this.user = new UserModel();
    this.user.email = 'jorge@gmail.com';
  }
}
