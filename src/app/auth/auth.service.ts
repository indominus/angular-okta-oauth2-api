import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isAuth(): boolean {
    return !!(!localStorage.getItem('token'));
  }

  // Generate a secure random string using the browser crypto functions
  generateRandomString() {
    const array = new Uint32Array(28);
    crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  }

  // Calculate the SHA256 hash of the input text.
  // Returns a promise that resolves to an ArrayBuffer
  sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return crypto.subtle.digest('SHA-256', data);
  }

  // Base64-urlencodes the input string
  base64urlencode(str) {
    // Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
    // btoa accepts chars only within ascii 0-255 and base64 encodes them.
    // Then convert the base64 encoded to base64url encoded
    //   (replace + with -, replace / with _, trim trailing =)
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

// Return the base64-urlencoded sha256 hash for the PKCE challenge
  async pkceChallengeFromVerifier(v) {
    await this.sha256(v).then(result => {
      console.log([result, 'result']);
      return this.base64urlencode(result);
    });
  }


  async getPKCEParams() {
    const verifier = this.generateRandomString();
    const challenge = await this.pkceChallengeFromVerifier(verifier);
    // @ts-ignore
    return {code_verifier: verifier, code_challenge: encodeURIComponent(challenge), code_challenge_method: 'S256'};
  }

  updateToken(code: string): Observable<any> {

    const clientId = '0oaex9w9fknxXbL4j4x6';
    const clientSecret = '2R-jTDzuO8vTH4UEUkIfvHnptRLSo4xzPXGHI69G';

    const body = Object.assign({}, this.getPKCEParams(), {
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:4200/',
      code,
    });

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);

    return this.http.post('https://dev-540489.okta.com/oauth2/default/v1/token', body, {headers});
  }
}
