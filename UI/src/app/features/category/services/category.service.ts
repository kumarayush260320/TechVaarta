import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,
    private cookieService:CookieService
  ) { }
  //to add category
  addCategory(model: AddCategoryRequest): Observable<void>{
    return this.http.post<void>('https://localhost:7203/api/categories?addAuth=true',model);
  }



//to get all category
//we have also used filtering property using HttpParams
// (1st 'query' is from categories controller 2nd is from params in UI )
getAllCategories(query?:string,
  sortBy?:string,
  sortDirection?:string,
pageNumber?:number,
pageSize?:number):Observable <Category[]>
{
    let params=new HttpParams();
    if(query)
    {
      params=params.set('query',query);
    }

    if(sortBy)
    {
      params=params.set('sortBy',sortBy)
    }

    if(sortDirection)
    {
      params=params.set('sortDirection',sortDirection)
    }
    if(pageNumber)
    {
      params=params.set('pageNumber',pageNumber)
    }
   if(pageSize)
    {
      params=params.set('pageSize',pageSize)
    } 


  return this.http.get<Category[]>('https://localhost:7203/api/Categories',
  {
    params:params
  });
}



//get categories by Id (returns single category so no [])
getCategoryById(id:string): Observable<Category>{
//return this.http.get<Category>('https://localhost:7049/api/Categories/${id}');
return this.http.get<Category>(`https://localhost:7203/api/Categories/${id}`);
}


//get categories count 
getCategoryCount(): Observable<number>{
return this.http.get<number>(`https://localhost:7203/api/Categories/count`);
}


//we are passing the authorization for user like the token 
//interceptors are also used to pass authorization headers
updateCategory(id: string, updateCategoryRequest:UpdateCategoryRequest):Observable<Category>
{
return this.http.put<Category>(`https://localhost:7203/api/Categories/${id}?addAuth=true`,
  updateCategoryRequest)

}


deleteCategory(id: string): Observable<Category>{
  return this.http.delete<Category>(`https://localhost:7203/api/Categories/${id}?addAuth=true`)
}
}



//we are passing the authorization for user like the token 
//interceptors are also used to pass authorization headers but here we can see direct application of header
/*updateCategory(id: string, updateCategoryRequest:UpdateCategoryRequest):Observable<Category>
{
return this.http.put<Category>(`https://localhost:7203/api/Categories/${id}`,
  updateCategoryRequest,{
headers:{
           'Authorization':this.cookieService.get('Authorization')
         }
});
}*/