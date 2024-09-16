import { CategoryService } from './../../category/services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBlogPost } from '../models/add-blog-post.model';
import { DatePipe } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule,DatePipe,MarkdownModule,CommonModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent  implements OnInit{
  // selectedCategories: number[] = [];

  model:AddBlogPost;
  categories$?:Observable<Category[]>;

  constructor(private blogPostService:BlogPostService,private router:Router,private CategoryService:CategoryService) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: []}
}
  ngOnInit(): void {
    this.categories$ = this.CategoryService.getAllCategories();
  }
  // onCategoryChange(event: Event, categoryId: number) {
  //   const checkbox = event.target as HTMLInputElement;
  //   if (checkbox.checked) {
  //     this.selectedCategories.push(categoryId);
  //   } else {
  //     this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
  //   }
  // }

onFormSubmit():void {
  //this.model.categories = this.selectedCategories;

console.log(this.model);
this.blogPostService.createBlogPost(this.model).subscribe({
  next:(response)=>{
    this.router.navigate(['/admin/blogposts']);
  }
});
}

}