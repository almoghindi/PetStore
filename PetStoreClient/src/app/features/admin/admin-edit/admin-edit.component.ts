import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../../core/models/product.model';
import { CategoryModel } from '../../../core/models/category.model';
import { ProductService } from '../../../core/services/product/product.service';
import { CategoryService } from '../../../core/services/category/category.service';

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css',
})
export class AdminEditComponent {
  product: ProductModel;
  categories: CategoryModel[] = [];
  constructor(
    private route: ActivatedRoute,
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
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((product) => {
        this.product = product;
      });
    }
  }
  onSubmit() {
    this.productService
      .updateProduct(this.product)
      .subscribe((response: any) => {
        alert('Product added successfully');
        this.router.navigate(['/admin']);
      });
  }
}
