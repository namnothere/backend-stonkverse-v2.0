import { Expose } from 'class-transformer';

export class CommentOutput {
  @Expose()
  title: string;

  @Expose()
  question: string;

  @Expose()
  courseId: string;

  @Expose()
  contentId: string;
}
