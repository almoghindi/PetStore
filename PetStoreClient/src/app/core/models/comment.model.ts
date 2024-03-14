export class CommentModel {
  constructor(
    public commentId: number = 0,
    public productId: number = 0,
    public author: string = '',
    public created: Date = new Date(),
    public commentMessage: string = ''
  ) {}
}
