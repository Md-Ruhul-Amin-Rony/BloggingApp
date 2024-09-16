import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { AddBlogPost } from '../models/add-blog-post.model';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../models/blog-post.model'; // Import the 'BlogPost' type

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit{

  blogPosts$: Observable<BlogPost[]> | undefined;

  constructor(private blogService :BlogPostService) { }
  
  ngOnInit(): void {
    //get all blogpost here;
    this.blogPosts$=this.blogService.getAllBlogPost();

  }

}
