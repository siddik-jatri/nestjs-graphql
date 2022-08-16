import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get("JWT").ACCESS_TOKEN_SECRET,
          signOptions: {
            expiresIn: config.get("JWT").ACCESS_TOKEN_VALIDITY
          }
        };
      }
    })
  ],
  providers: [AuthService, LocalStrategy, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
