import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
 categories$?: Observable<Category[]>;
totalCount?:number;
pageNumber=1;
pageSize=5;
list:number[]=[];

constructor(private categoryService:CategoryService){
  
}


ngOnInit(): void {
        this.categoryService.getCategoryCount()
        .subscribe({
          next:(value)=>{
        this.totalCount=value;
            this.list=new Array(Math.ceil(value/this.pageSize))//helps us to know how many pages we want
            //in pagination
            //value=total count of values in category list


        this.categories$=this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
          }
        }); 
}

onSearch(query:string)
{
this.categories$=this.categoryService.getAllCategories(query);
//alert(query);
}

sort(sortBy:string,sortDirection:string){
  this.categories$=this.categoryService.getAllCategories(undefined,sortBy,sortDirection);
}
getThisPage(pageNumber:number)
{
  this.pageNumber=pageNumber;
  this.categories$=this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          pageNumber,
          this.pageSize
        );
}

getNextPage(){

  if(this.pageNumber+1>this.list.length){
    return;}//checking if we are going on top of list it does no task
  this.pageNumber+=1;
  this.categories$=this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
}

getPreviousPage(){

  if(this.pageNumber-1<1){
    return;}//checking if we are going on 1st page it does no task


  this.pageNumber-=1;
  this.categories$=this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
}
}
