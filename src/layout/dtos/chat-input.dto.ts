import { IsString, IsNotEmpty } from 'class-validator';

export class ChatInput {
  @IsString()
  @IsNotEmpty()
  message: string;

  constructor(partial: Partial<ChatInput>) {
    Object.assign(this, partial);
  }
}
