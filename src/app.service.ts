import { Injectable } from '@nestjs/common';
import { GithubService } from './auth/github/github.service';

@Injectable()
export class AppService {
  constructor(private readonly githubService: GithubService) {}

  async getGithubInfo(accessToken: string) {
    const response = await this.githubService.getGithubInfo(accessToken);
    return response.data;
  }
}
