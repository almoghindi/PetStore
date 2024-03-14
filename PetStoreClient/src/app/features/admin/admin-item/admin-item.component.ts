import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from '../../../core/models/product.model';
@Component({
  selector: 'app-admin-item',
  standalone: true,
  imports: [],
  templateUrl: './admin-item.component.html',
  styleUrl: './admin-item.component.css',
})
export class AdminItemComponent {
  @Input() product: ProductModel;
  @Output() edit = new EventEmitter<ProductModel>();
  @Output() delete = new EventEmitter<number>();

  constructor() {
    this.product = new ProductModel();
  }

  onEdit() {
    this.edit.emit(this.product);
  }

  onDelete() {
    this.delete.emit(this.product.productId);
  }
}
