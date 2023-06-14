import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import axios from 'axios';

@Injectable()
export class GithubService {
  constructor() {}

  async getUserRepositories(accessToken: string): Promise<AxiosResponse<any>> {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get('https://api.github.com/user/repos', config);
  }
}
