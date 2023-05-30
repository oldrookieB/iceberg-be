import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { GithubDto } from './user.dto'

export interface UserTypes {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  public async getGithubInfo(githubDto: GithubDto): Promise<UserTypes> {
    // Token 
    const { code } = githubDto;
    const getToken: string = 'https://github.com/login/oauth/access_token';
    const request = {
      code,
      client_id: "",
      client_secret: ""
    };
    const response: AxiosResponse = await axios.post(getToken, request, {
      headers: {
        accept: 'application/json'
      },
    });

    // Response Fail
    if (response.data.error) {
      /* Error Code */
    }

    // Resoponse Success
    const { access_token } = response.data;

    const getUserInfo: string = 'https://api.github.com/user';
    
    const { data } = await axios.get(getUserInfo, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    const { login, name, email } = data;
    
    const githubInfo: UserTypes = {
      id: login,
      name,
      email,
    };

    return githubInfo;
  }
}