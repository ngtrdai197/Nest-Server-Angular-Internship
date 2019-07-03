import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';

@Injectable({providedIn:"root"})
export class JwtService {
  constructor() { }

  setToken(token) {
    localStorage.setItem('x-access-token', token);
  }
  setUser(user) {
    localStorage.setItem('user',JSON.stringify(user));
  }
  getUser() {
    return localStorage.getItem('user');
  }
  getToken() {
    return localStorage.getItem('x-access-token');
  }
  destroyToken() {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user');
  }
  decodeToken(token){
    const decoded = decode(token);

    return decoded;
  }

}
