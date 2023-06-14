import { Injectable } from '@nestjs/common';
import { GithubService } from './auth/github/github.service';

@Injectable()
export class AppService {
  constructor(private readonly githubService: GithubService) {}

  async getUserRepositories(accessToken: string) {
    const response = await this.githubService.getUserRepositories(accessToken);
    return response.data;
  }
}
