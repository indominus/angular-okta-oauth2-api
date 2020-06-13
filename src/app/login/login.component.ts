import {Component, OnInit} from '@angular/core';
import {AuthHelper} from '../auth/auth-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private authHelper: AuthHelper) {
  }

  ngOnInit(): void {
  }

  loginRedirect(): void {

    const clientId = 'AtYbjj1aDV69DmdoIa5GglZ6C1WNREPQ';

    const state = this.authHelper.randomString();
    localStorage.setItem('state', state);

    const verifier = this.authHelper.randomString();
    localStorage.setItem('verifier', verifier);

    this.authHelper.generateChallenge(verifier).then((challenge) => {
      const params = {
        state,
        client_id: clientId,
        response_type: 'code',
        audience: encodeURIComponent('https://devx.eu.auth0.com/api/v2/'),
        redirect_uri: encodeURIComponent('http://localhost:4200/callback'),
        scope: encodeURIComponent('openid offline_access'),
        code_challenge: challenge,
        code_challenge_method: 'S256'
      };
      window.location.href = 'https://devx.eu.auth0.com/authorize?' + Object.keys(params).map(
        key => `${key}=${params[key]}`
      ).join('&');
    });
  }
}
