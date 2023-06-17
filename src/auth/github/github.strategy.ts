import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: 'GITHUB_REDIRECT_URI',
    });
  }
  

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    return {
      accessToken,
      refreshToken,
      profile : {
        
      },
    };
  }
}