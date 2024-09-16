import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post-model';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [CommonModule ,FormsModule,MarkdownModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit,OnDestroy {

  categories$?:Observable<Category[]>;
  selectedCategories?: string[];
 id:string | null = null;
  model?:BlogPost;
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;

  constructor(private route:ActivatedRoute, private blogPostService:BlogPostService, private categoryService:CategoryService
    ,private router: Router) { }
  

  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
    this.routeSubscription=this.route.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id');
        if(this.id != null){

       this.getBlogPostSubscription= this.blogPostService.getBlogPostById(this.id).subscribe({
          next:(response)=>{
            this.model=response;
           this.selectedCategories = this.model.categories.map(c => c.id);
          }
        })}
      }
    })
  }
  // onCategoryChange(event: Event, categoryId: number) {
  //   const checkbox = event.target as HTMLInputElement;
  //   if (checkbox.checked) {
  //     this.selectedCategories.push(categoryId);
  //   } else {
  //     this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
  //   }
  // }
  onFormSubmit() {
    if(this.model && this.id){
      var updateBlogPost:UpdateBlogPost={
        author:this.model.author,
        title:this.model.title,
        shortDescription:this.model.shortDescription,
        content:this.model.content,
        featuredImageUrl:this.model.featuredImageUrl,
        urlHandle:this.model.urlHandle,
        publishedDate:this.model.publishedDate,
        isVisible:this.model.isVisible,
        categories:this.selectedCategories?? []
      };
      this.updateBlogPostSubscription=this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next:(resposne)=>{
          this.router.navigateByUrl('/admin/blogposts');
}
      })
}}
onDelete() {
  if(this.id){
  this.blogPostService.deleteBlogPost(this.id).subscribe({
    next:(response)=>{
      this.router.navigateByUrl('/admin/blogposts');
    }
  })}
}
    

    


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
  }

}
