import { Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('login')
  @UseGuards(LocalAuthGuard)
  login(@Context() ctx) {
    return this.authService.login(ctx.user)
  }
}
