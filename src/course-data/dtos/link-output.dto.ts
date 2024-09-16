import { Expose } from "class-transformer";

export class LinkOutput {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  url: string;
}