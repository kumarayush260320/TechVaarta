import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy{

id:string | null=null;
model?:BlogPost//to get the blogPost by id
categories$?:Observable<Category[]>;// to get categories in edit component it will be a list
selectedCategories?:string[];
//for image selector default value is false
isImageSelectorVisible:boolean=false;



routeSubscription?:Subscription;
updateBlogPostSubscription?:Subscription;
getBlogPostSubscription?:Subscription;
deleteBlogPostSubscription?:Subscription;
imageSelectSubscription?:Subscription;


//we add category and blogpost service as we need to show both
//  in edit category component
constructor(private route:ActivatedRoute,
  private blogPostService:BlogPostService,
  private categoryService:CategoryService,
private router:Router,
private imageService:ImageService){

}



ngOnInit():void
{


  this.categories$=this.categoryService.getAllCategories();


  this.routeSubscription=this.route.paramMap.subscribe({
  next:(params)=>
  {
    this.id=params.get('id');
    //Get BlogPost from API
          if(this.id){
            this.getBlogPostSubscription=this.blogPostService.getBlogPostById(this.id).
            subscribe({
            next:(response)=>{
            this.model = response;
            this.selectedCategories = response.categories.map(x=>x.id)
                              }
                      }); 
                    }
    this.imageSelectSubscription=this.imageService.onSelectImage()
    .subscribe({
      next:(response)=>
        {
          if(this.model)
          {
            this.model.featuredImageUrl=response.url;
           //to make the image selector box dissapper after select
            this.isImageSelectorVisible=false;
          }
        }
    });

  }
  });
}
//when form submitted from html page talks to api and show the results for us
onFormSubmit():void{
//Convert this modeel tp request object
if(this.model && this.id){
  var updateBlogPost:UpdateBlogPost={
    author:this.model.author,
    content:this.model.content,
    shortDescription:this.model.shortDescription,
    featuredImageUrl:this.model.featuredImageUrl,
    isVisible:this.model.isVisible,
    publishedDate:this.model.publishedDate,
    title:this.model.title,
    urlHandle:this.model.urlHandle,
    categories:this.selectedCategories??[]
  }
this.blogPostService.updateBlogPost(this.id,updateBlogPost)
.subscribe({
  next:(response)=>{
    this.router.navigateByUrl('/admin/blogposts');
  }
});
}
}
onDelete():void{
if(this.id){
  //calll service and delete blogpost
  this.deleteBlogPostSubscription=this.blogPostService.deleteBlogPost(this.id)
  .subscribe({
    next:(response)=>{
      this.router.navigateByUrl('/admin/blogposts');
    }
  });
}
}

//to toggle the visibility of image selector 
openImageSelector():void{
this.isImageSelectorVisible=true;
}
closeImageSelector():void{
  this.isImageSelectorVisible=false;
}
ngOnDestroy():void
{
this.routeSubscription?.unsubscribe();
this.updateBlogPostSubscription?.unsubscribe();
this.getBlogPostSubscription?.unsubscribe();
this.deleteBlogPostSubscription?.unsubscribe();
this.imageSelectSubscription?.unsubscribe();
}

}
