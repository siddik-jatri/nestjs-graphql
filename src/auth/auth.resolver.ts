import { Resolver, Mutation, Args, Query, Context } from "@nestjs/graphql";
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { SignupInput } from "./dto/signup.input";
import { User } from "../user/schema/user.schema";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Query(() => Auth, { name: 'login' })
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx
  ) {
    return this.authService.login(ctx.user);
  }

  @Mutation(() => User)
  signup(@Args('signupInput') signupInput: SignupInput) {
    return this.authService.signup(signupInput);
  }
}
