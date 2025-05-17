import { Component ,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit , OnDestroy
{
        id:string | null=null;
        paramsSubscription?: Subscription;
        editCategorySubscription?:Subscription;
        category?:Category;
        constructor(private route: ActivatedRoute,
          private categoryService:CategoryService,
          private router:Router)
          {

          } 

          ngOnInit():void
          {
          this.paramsSubscription=this.route.paramMap.subscribe({
          next:(params)=>
          {
            this.id=params.get('id');
            if(this.id)
            {
              //get the data from the API for this category Id
              this.editCategorySubscription=this.categoryService.getCategoryById(this.id)
              .subscribe({
                next:(response)=>{
                  this.category=response;
                  console.log('Category object:', this.category);
                }
              });
            }
          }
             });
            }
          onFormSubmit(): void{
            //console.log(this.category);
            const updateCategoryRequest: UpdateCategoryRequest={
          name:this.category?.name ?? '',
          urlHandlen:this.category?.urlHandlen ?? ''
            };
          //pass this object to service class
          if(this.id)
          {
            this.categoryService.updateCategory(this.id,updateCategoryRequest)
            .subscribe({
              next:(response)=>{
                  this.router.navigateByUrl('/admin/categories');
              }
            });
          }
            }
          onDelete():void{
  if(this.id)
  this.categoryService.deleteCategory(this.id) 
  .subscribe({
    next:(response)=>{
        this.router.navigateByUrl('/admin/categories');
    }
  });
            }
          ngOnDestroy():void
          {
            this.paramsSubscription?.unsubscribe();
            this.editCategorySubscription?.unsubscribe();
            }
}
