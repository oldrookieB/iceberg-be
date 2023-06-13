import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get('auth/github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get('auth/github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    res.redirect('/localhost:5173/addproject'); // 로그인 후 리다이렉션 되는 url
  }
}
