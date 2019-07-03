import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/@core/config/API';
import { IUser } from 'src/@core/interface/IUser.interface';

@Injectable({ providedIn: "root" })
export class UserService {

  constructor(private http: HttpClient) { }

  onSignIn(user: any): Observable<any> {
    return this.http.post(`${API.HOST}/auth/token`, user);
  }

  onFetchUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${API.HOST}/users/api`);
  }

  onDeleteUser(id: String): Observable<Object> {
    return this.http.delete<Object>(`${API.HOST}/${API.USER.DELETE_USER}/${id}`);
  }

  onCreateNewUser(user: IUser): Observable<Object> {
    return this.http.post<Object>(`${API.HOST}/${API.USER.CREATE_USER}`, user);
  }

  onUpdateUser(id: String, user: IUser): Observable<Object> {
    return this.http.put<Object>(`${API.HOST}/${API.USER.UPDATE_USER}/${id}`, user);
  }
}
