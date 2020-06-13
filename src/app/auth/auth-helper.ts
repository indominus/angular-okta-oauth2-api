import {Injectable} from '@angular/core';

@Injectable()
export class AuthHelper {

  constructor() {
  }

  randomString() {
    const array = new Uint32Array(28);
    crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  }

  sha256Encode(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return crypto.subtle.digest('SHA-256', data);
  }

  base64URLEncode(str) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/\+/g, '-')
      .replace(/\//, '_')
      .replace(/=/g, '');
  }

  async generateChallenge(verifier) {
    const hashed = await this.sha256Encode(verifier);
    return this.base64URLEncode(hashed);
  }
}
