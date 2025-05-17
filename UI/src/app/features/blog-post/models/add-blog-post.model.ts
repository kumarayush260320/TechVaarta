export interface AddBlogPost{


    title:string;
    shortDescription:string;
    content:string;
    featuredImageUrl:string;
    urlHandle:string;
    author:string;
    publishedDate:Date;
    isVisible:boolean;
//we also want to capture category so
categories:string[];

}