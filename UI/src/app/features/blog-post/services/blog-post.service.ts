import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPost } from '../models/blog-post.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {


  constructor(private http:HttpClient){}

createBlogPost(data: AddBlogPost):Observable<BlogPost>
{
  return this.http.post<BlogPost>(`https://localhost:7203/api/blogposts?addAuth=true`, data);
}

getAllBlogPosts():Observable<BlogPost[]>
{
  return this.http.get<BlogPost[]>(`https://localhost:7203/api/blogposts`);
}

getBlogPostById(id:String): Observable<BlogPost>
{
return this.http.get<BlogPost>(`https://localhost:7203/api/blogposts/${id}`)
}
getBlogPostByUrlHandle(urlHandle:String): Observable<BlogPost>
{
return this.http.get<BlogPost>(`https://localhost:7203/api/blogposts/${urlHandle}`)
}
updateBlogPost(id:string,updatedBlogPost:UpdateBlogPost):Observable<BlogPost>{
  return this.http.put<BlogPost>(`https://localhost:7203/api/blogposts/${id}?addAuth=true`,updatedBlogPost);//we passed body updatedBlogPost because we want updated Blogpost
}

deleteBlogPost(id:string):Observable<BlogPost>{
  return this.http.delete<BlogPost>(`https://localhost:7203/api/blogposts/${id}?addAuth=true`)
}

}
