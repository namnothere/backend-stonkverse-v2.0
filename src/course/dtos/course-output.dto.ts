import { Expose, Transform, Type } from 'class-transformer';

import { CloudinaryFileOutput } from '../../cloudinary/dtos/cloudinary-file-output.dto';

export class CourseOutput {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  @Type(() => Number)
  price: number;

  @Expose()
  @Type(() => Number)
  estimatedPrice: number;

  @Expose()
  @Transform(({ value }) => value.split(','), { toClassOnly: true })
  tags: string[];

  @Expose()
  level: string;

  @Expose()
  demoUrl: string;

  @Expose()
  @Type(() => CloudinaryFileOutput)
  thumbnail: CloudinaryFileOutput;

  @Expose()
  @Type(() => CloudinaryFileOutput)
  curriculum: CloudinaryFileOutput;

  constructor(partial: Partial<CourseOutput>) {
    Object.assign(this, partial);
  }
}
