import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/health')
export class HealthController {
  constructor() {}

  @Get('/liveness')
  liveness(@Res() res: Response): any {
    return res.status(HttpStatus.OK).send();
  }
}
