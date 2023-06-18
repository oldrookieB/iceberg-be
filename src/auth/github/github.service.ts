import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import axios from 'axios';


export interface GithubRepository {
  name: string;
  fork: boolean;
  topics: string[];
  readmeContent: string;
}

@Injectable()
export class GithubService {
  constructor(private readonly configService: ConfigService) {}

  async getGithubOauthToken(code: string | null): Promise<AxiosResponse<any>> {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = this.configService.get('github');
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  }

  async getGithubInfo(accessToken: string): Promise<any> {
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const reposResponse = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 사용자 정보
    const { 
      login, 
      id, 
      name,
      avatar_url,
      repos_url,
    } = userResponse.data;

    // 레포지토리 정보 (name, fork, topics, readmeContent)
    const repositories: GithubRepository[] = await Promise.all(
      reposResponse.data.map(async (repo: any) => {
        const { name, fork, topics_url, default_branch } = repo;
        const readmeUrl = `https://raw.githubusercontent.com/${login}/${name}/${default_branch}/README.md`;

        const topicsResponse = await axios.get(topics_url, {
          headers: {
            Accept: 'application/vnd.github.mercy-preview+json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const readmeResponse = await axios.get(readmeUrl);

        const topics: string[] = topicsResponse.data.names;
        const readmeContent: string = readmeResponse.data;

        return {
          name,
          fork,
          topics,
          readmeContent,
        };
      })
    );

    return {
      username: login,
      id,
      name,
      avatar_url,
      repos_url,
      repositories,
    };
  }
}