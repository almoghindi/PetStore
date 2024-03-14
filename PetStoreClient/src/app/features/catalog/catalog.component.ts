import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product/product.service';
import { CategoryService } from '../../core/services/category/category.service';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { CategoryModel } from '../../core/models/category.model';
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CatalogItemComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  categories: CategoryModel[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        const apiResponse = response as {
          $id: string;
          $values: ProductModel[];
        };
        this.products = apiResponse.$values;
        this.filteredProducts = this.products;
        this.activatedRoute.queryParams.subscribe((params) => {
          const searchQuery = params['search'];
          if (searchQuery) {
            this.filteredProducts = this.products.filter((x) =>
              x.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
        });
      },
    });
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        const apiResponse = response as {
          $id: string;
          $values: ProductModel[];
        };
        this.categories = apiResponse.$values;
      },
    });
  }
  onSelectedCategory(categoryId: string | number) {
    if (categoryId === '0') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (x) => x.categoryId == categoryId
      );
    }
  }
}
