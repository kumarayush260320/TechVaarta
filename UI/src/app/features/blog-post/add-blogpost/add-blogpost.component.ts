import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';
@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit,OnDestroy {
model: AddBlogPost;
categories$?: Observable<Category[]>;//to reeceive a list of categories
isImageSelectorVisible:boolean=false;
imageSelectorSubscription?:Subscription;


constructor(private blogPostService:BlogPostService,
            private router:Router,
            private categoryService: CategoryService,
          private imageService:ImageService)
            {
              this.model=
              {
                
                title:'',
                shortDescription:'',
                content:'',
                featuredImageUrl:'',
                urlHandle:'',
                author:'',
                publishedDate:new Date(),
                isVisible:true,
                categories:[]//bind this category to html
               }
            }
  
  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
    //to show category list in add blogpost part
    this.imageSelectorSubscription=this.imageService.onSelectImage()
    .subscribe({
      next:(selectedImage)=>{
        this.model.featuredImageUrl=selectedImage.url;
        this.closeImageSelector();
      }
    })
  }
onFormSubmit():void{
console.log(this.model);
this.blogPostService.createBlogPost(this.model)
.subscribe({
  next:(response)=>{
    this.router.navigateByUrl('/admin/blogposts');
  }
});
}

openImageSelector():void{
  this.isImageSelectorVisible=true;
  }
  closeImageSelector():void{
    this.isImageSelectorVisible=false;
  }

  //? -> means if defined then only unsubscibe
  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
