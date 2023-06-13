import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GitHubStrategy } from './github/github.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'github' }),
    ConfigModule,
  ],
  providers: [GitHubStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
