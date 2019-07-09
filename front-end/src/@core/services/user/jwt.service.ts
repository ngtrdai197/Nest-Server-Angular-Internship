import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/@core/interface';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/@core/config/API';

@Injectable({ providedIn: "root" })
export class JwtService {
  private userProfile = new BehaviorSubject<IUser>(null);

  get getProfile() {
    return this.userProfile.asObservable();
  }

  constructor(private http: HttpClient) { }

  setUserProfile(user: IUser) {
    this.userProfile.next(user);
  }

  checkUserProfile() {
    return this.userProfile.getValue() ? true : false;
  }

  getUserProfileByToken() {
    this.http.get(`${API.HOST}/${API.USER.BASE}/token`).subscribe(response => {
      return this.setUserProfile(response as IUser);
    }, err => {
      throw err;
    });
  }

  setToken(token) {
    localStorage.setItem('x-access-token', token);
  }
  getToken() {
    return localStorage.getItem('x-access-token');
  }
  destroyToken() {
    localStorage.removeItem('x-access-token');
  }
  decodeToken(token) {
    const decoded = decode(token);
    return decoded;
  }

}
