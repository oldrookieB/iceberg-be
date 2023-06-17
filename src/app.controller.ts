import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { RequestWithUser } from './interfaces/request-with-user.interface';


@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get()
  @UseGuards(AuthGuard('github'))
  githubAuthCallback(@Req() req: RequestWithUser) {
    const accessToken = req.user.accessToken;
    return { access_token: accessToken };
  }

  @Get('repositories')
  @UseGuards(AuthGuard('github'))
  getUserRepositories(@Req() req: RequestWithUser) {
    const accessToken = req.user.accessToken;
    return this.appService.getUserRepositories(accessToken);
  }
}
