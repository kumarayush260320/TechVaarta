import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogImage } from '../../models/blog-image.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ImageService } from './image.service';


@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit{
  private file?: File;
  fileName: string='';
  title:string='';
  images$?:Observable<BlogImage[]>;//to store all images received

//to refresh the image selector page
  @ViewChild('form',{static:false})imageUploadForm?: NgForm;


constructor(private imageService:ImageService){}
  ngOnInit(): void {
    this.getImages();
  }


  onFileUploadChange(event:Event):void{
    const element=event.currentTarget as HTMLInputElement;
    this.file=element.files?.[0];
  }
  uploadImage():void{
    if(this.file && this.fileName != '' && this.title!=''){
      //Image service to upload image
      this.imageService.uploadImage(this.file,this.fileName,this.title)
      .subscribe({
        next:(response)=>{
          this.imageUploadForm?.resetForm();
         // console.log(response);
          //after upload we could see fresh list of images
          this.getImages();
        }
      });
    }
  }
selectImage(image:BlogImage):void{
this.imageService.selectImage(image);
}



  private getImages(){
    this.images$=this.imageService.getAllImages();
  }
}
