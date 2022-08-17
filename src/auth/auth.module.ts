import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthResolver } from "./auth.resolver";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";

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
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
