import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from 'src/@core/interface/ICategory.interface';
import { API } from 'src/@core/config/API';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  onFetchCategorys(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${API.HOST}/${API.CATEGORY.GET_ALL}`);
  }

  onDeleteCategory(id: String): Observable<Object> {
    return this.http.delete<Object>(`${API.HOST}/${API.CATEGORY.DELETE_CATEGORY}/${id}`);
  }

  onAddCategory(category: ICategory): Observable<Object> {
    return this.http.post<Object>(`${API.HOST}/${API.CATEGORY.CREATE_CATEGORY}`, category);
  }
}
