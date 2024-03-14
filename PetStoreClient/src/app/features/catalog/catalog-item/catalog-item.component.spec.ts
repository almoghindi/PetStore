import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItemComponent } from './catalog-item.component';

describe('CatalogItemComponent', () => {
  let component: CatalogItemComponent;
  let fixture: ComponentFixture<CatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
