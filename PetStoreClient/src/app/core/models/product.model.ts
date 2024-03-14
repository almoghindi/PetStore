export class ProductModel {
  constructor(
    public productId: number = 0,
    public name: string = '',
    public price: number = 0,
    public pictureUrl: string = '',
    public description: string = '',
    public categoryId: number = 0
  ) {}
}
