import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthHelper} from './auth-helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private authHelper: AuthHelper) {
  }

  isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  updateToken(code: string): Observable<any> {

    const clientId = 'AtYbjj1aDV69DmdoIa5GglZ6C1WNREPQ';
    const clientSecret = '1hyA4c62hn3hf3r8icLCIklp0vFRG-ay5n8wqsthRuWYyz8VCk5hirdceApv20_y';

    const params = {
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:4200/callback',
      code_verifier: localStorage.getItem('verifier'),
    };
    const body = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', `Basic ${btoa(clientId + ':' + clientSecret)}`);

    return this.http
      .post('https://devx.eu.auth0.com/oauth/token', body, {headers});
  }
}
