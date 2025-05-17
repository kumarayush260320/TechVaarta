import { Injectable } from '@angular/core';
import { BlogImage } from '../../models/blog-image.model';
//import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
selectedImage:BehaviorSubject<BlogImage>=new BehaviorSubject<BlogImage>({
    id:'',
    fileExtension:'',
    fileName:'',
    title:'',
    url:''
});

  constructor(private http:HttpClient) {}


//gets us all blog images
getAllImages():Observable<BlogImage[]>{
  return this.http.get<BlogImage[]>(`https://localhost:7203/api/images`)
}

  uploadImage(file:File,fileName:string,title:string):Observable<BlogImage>{
    const formdata=new FormData();
    formdata.append('file',file);
    formdata.append('fileName',fileName);
    formdata.append('title',title);
    return this.http.post<BlogImage>(`https://localhost:7203/api/images`,formdata);
  }


  selectImage(image:BlogImage):void{
this.selectedImage.next(image);
  }

  onSelectImage():Observable<BlogImage>{
    return this.selectedImage.asObservable()
  }
}
