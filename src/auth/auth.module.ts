import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GithubStrategy } from './github/github.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'github' }),
    ConfigModule,
  ],
  providers: [GithubStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
