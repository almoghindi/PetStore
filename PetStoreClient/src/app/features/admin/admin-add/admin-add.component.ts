import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../../core/models/product.model';
import { CategoryModel } from '../../../core/models/category.model';
import { ProductService } from '../../../core/services/product/product.service';
import { CategoryService } from '../../../core/services/category/category.service';
@Component({
  selector: 'app-admin-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-add.component.html',
  styleUrl: './admin-add.component.css',
})
export class AdminAddComponent {
  product: ProductModel;
  categories: CategoryModel[] = [];
  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.product = new ProductModel();
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        const apiResponse = response as {
          $id: string;
          $values: CategoryModel[];
        };
        this.categories = apiResponse.$values;
      },
    });
  }
  onSubmit() {
    this.productService.addProduct(this.product).subscribe((response: any) => {
      alert('Product added successfully');
      this.router.navigate(['/admin']);
    });
  }
}
