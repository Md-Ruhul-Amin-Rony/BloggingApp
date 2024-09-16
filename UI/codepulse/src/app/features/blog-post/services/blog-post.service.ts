import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPost } from '../models/update-blog-post-model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }
  createBlogPost(model:AddBlogPost):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/BlogPost`,model);
}
getAllBlogPost():Observable<BlogPost[]>{
  return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPost`);

}

getBlogPostById(id:string):Observable<BlogPost>{
  return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`);

}
updateBlogPost(id:string, updatedBlogPost:UpdateBlogPost):Observable<BlogPost>{
  return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`, updatedBlogPost);
}
deleteBlogPost(id:string):Observable<BlogPost>{
  return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`);
}
}