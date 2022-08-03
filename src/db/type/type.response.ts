import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty()
  public statusCode: number;
  @ApiProperty()
  public message: string;
}
