import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{
url:string|null=null;
blogPost$?:Observable<BlogPost>;

constructor(private route:ActivatedRoute,
  private blogPostService:BlogPostService
){}






  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.route.paramMap
    .subscribe({
      next:(params)=>{
       this.url= params.get('url')
      }
    });



    //fetch blog-details by url
if(this.url){
  this.blogPost$=this.blogPostService.getBlogPostByUrlHandle(this.url);
}
  }

}
