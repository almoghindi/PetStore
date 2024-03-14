import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../../core/models/product.model';
import { CommentModel } from '../../../core/models/comment.model';
import { ProductService } from '../../../core/services/product/product.service';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, TruncatePipe, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  product: ProductModel;
  comments: CommentModel[] = [];
  newCommentText: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.product = new ProductModel();
  }

  loadComments(productId: string) {
    this.productService.getComments(productId).subscribe({
      next: (response: any) => {
        const apiResponse = response as {
          $id: string;
          $values: CommentModel[];
        };
        this.comments = apiResponse.$values;
      },
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((product) => {
        this.product = product;
      });
      this.loadComments(productId);
    }
  }

  addComment(): void {
    if (!this.newCommentText.trim()) {
      alert('Comment text is required.');
      return;
    }

    const username = localStorage.getItem('authName');
    if (!username) {
      alert('You must be logged in to comment.');
      return;
    }

    this.productService
      .addComment(this.product.productId, username, this.newCommentText)
      .subscribe({
        next: (comment) => {
          this.loadComments(this.product.productId.toString());
          this.newCommentText = '';
        },
        error: (error) => {
          console.error('Error adding comment:', error);
          alert('Failed to add comment. Please try again.');
        },
      });
  }
}
