
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { CategoryService } from '../services/category.service';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule,CommonModule,],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
model:AddCategoryRequest;
private addCategorySubscription?:Subscription;

constructor(private categoryService:CategoryService,private router:Router) {
  this.model = {
    name: '',
    urlHandle: ''
  }; }






onFormSubmit(){
console.log(this.model);

this.addCategorySubscription=this.categoryService.addCategory(this.model).subscribe({
  next:(response)=>{
    console.log(response);
    this.router.navigateByUrl('/admin/categories');
  }
}

)

  }
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
