import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoadImage]',
  standalone: true,
})
export class LazyLoadImageDirective implements AfterViewInit {
  @Input() lazyLoad: string = '';
  @Input() placeholder: string = '';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage();
          observer.unobserve(this.el.nativeElement);
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }

  loadImage() {
    if (this.placeholder) {
      this.el.nativeElement.src = this.placeholder;
    }
    const img = new Image();
    img.src = this.lazyLoad;
    img.onload = () => {
      this.el.nativeElement.src = this.lazyLoad;
    };
  }
}
