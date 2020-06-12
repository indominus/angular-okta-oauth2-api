import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  loginRedirect(): void {

    const state = Math.random().toString(20).substr(2, 128);
    localStorage.setItem('state', state);

    const params = Object.assign({}, {
      response_type: 'code',
      client_id: '0oaex9w9fknxXbL4j4x6',
      redirect_uri: 'http://localhost:4200/callback',
      scope: 'openid offline_access',
      state,
    }, this.authService.getPKCEParams());

    const url = 'https://dev-540489.okta.com/oauth2/default/v1/authorize?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    console.log([url]);
    //window.location.href = url;
  }
}
