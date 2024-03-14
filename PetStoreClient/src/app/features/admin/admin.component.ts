import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductModel } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product/product.service';
import { AdminItemComponent } from './admin-item/admin-item.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AdminItemComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  products: ProductModel[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products: any) => {
        const apiResponse = products as {
          $id: string;
          $values: ProductModel[];
        };
        this.products = apiResponse.$values;
      },
      error: (error) => console.error(error),
    });
  }

  onAdd() {
    this.router.navigate(['/admin/add']);
  }

  onEdit(product: ProductModel) {
    this.router.navigate(['/admin/edit', product.productId]);
  }

  onDelete(productId: number) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }
}
