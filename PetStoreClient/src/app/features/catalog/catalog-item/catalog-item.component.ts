import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../core/store/cart.actions';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { LazyLoadImageDirective } from '../../../shared/directives/lazy-load-image.directive';
@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [RouterLink, TruncatePipe, LazyLoadImageDirective],
  templateUrl: './catalog-item.component.html',
  styleUrl: './catalog-item.component.css',
})
export class CatalogItemComponent {
  @Input() product: any;
  @Input() src: string = '';
  constructor(private store: Store) {}
  addProductToCart() {
    this.store.dispatch(addToCart({ item: this.product }));
  }
}
