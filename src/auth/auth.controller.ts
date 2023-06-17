import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
  }

  @Get()
  @UseGuards(AuthGuard('github'))
  githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    res.redirect('http://127.0.0.1:3000/auth');
  }
}
