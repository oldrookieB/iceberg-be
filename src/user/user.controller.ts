import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { GithubDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('/github-info')
  public async getGithubInfo(@Body() githubDto: GithubDto) {
    const user = await this.userService.getGithubInfo(githubDto);

    return {
      status: 200,
      message: 'Importing user information succeeded',
      data: {
        user,
      },
    };
  }
}