import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get()
  @UseGuards(AuthGuard('github'))
  githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    res.redirect('GITHUB_REDIRECT_URI');
  }
}
