import { Expose } from 'class-transformer';

export class CloudinaryFileOutput {
  @Expose()
  id: string;

  @Expose()
  public_id: string;

  @Expose()
  url: string;

  @Expose()
  type: string;

  @Expose()
  courseThumbnail: string;

  @Expose()
  courseCurriculum: string;

  constructor(partial: Partial<CloudinaryFileOutput>) {
    Object.assign(this, partial);
  }
}
