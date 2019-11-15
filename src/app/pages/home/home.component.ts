import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _auth: AuthService,
               private _router: Router ) { }

  ngOnInit() {
  }

  exit() {
    this._auth.signOut();
    this._router.navigateByUrl('/login');
  }

}
