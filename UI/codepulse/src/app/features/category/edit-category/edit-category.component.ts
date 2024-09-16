import { ActivatedRoute, Router } from '@angular/router';
import { routes } from './../../../app.routes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy{
  id:string | null = null;
  paramsSubscription?:Subscription;
  categoryEdit?:Category;

  constructor(private route:ActivatedRoute, private categoryService:CategoryService,private router:Router) { }


  ngOnInit(): void {
    this.paramsSubscription=this.route.paramMap.subscribe({
      next:(params)=>{
        this.id= params.get('id');
        if(this.id){
          console.log(this.id)
          this.categoryService.getCategoryById(this.id).subscribe({
            next:(response)=>{
              this.categoryEdit=response;

            }
          })

      }}
    });
  }
  onFormSubmit():void{
    const updateCategoryRequest:UpdateCategoryRequest={
      name:this.categoryEdit?.name??'',
      urlHandle:this.categoryEdit?.urlHandle??'',

    };
    if (this.id){
      this.categoryService.updateCategory(this.id, updateCategoryRequest).subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/categories');
          this.categoryEdit=response;
        }
      });

    }
  }


onDelete():void{
  this.categoryService.deleteCategory(this.id??'').subscribe({
    next:(response)=>{
      this.router.navigateByUrl('/admin/categories');
    }

})
}

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

}

