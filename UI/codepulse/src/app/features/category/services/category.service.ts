import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import {  UpdateCategoryRequest } from '../models/update-category-request.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(model:AddCategoryRequest):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`,model);
}

getAllCategories(query?:string, sortBy?:string, sortDirection?:string   ):Observable<Category[]>{

  let params=new HttpParams();
  if(query){
    params=params.set('query',query);

  }
  if(sortBy){
    params=params.set('sortBy',sortBy);
  }
  if(sortDirection){
    params=params.set('sortDirection',sortDirection);
  }
  return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`,{params:params}
  );

}
getCategoryById(id:string):Observable<Category>{
return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
}
updateCategory(id:string, updateCategoryRequest:UpdateCategoryRequest):Observable<Category>{
  return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`, updateCategoryRequest);
}
deleteCategory(id:string):Observable<Category>{
  return this.http.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);

}

}
