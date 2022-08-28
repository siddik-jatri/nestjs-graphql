import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { UserService } from "../../user/user.service";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "../../user/schema/user.schema";
import { JwtService } from "@nestjs/jwt";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";

describe("Auth Service", () => {
  let authService: AuthService;
  const userPayload = {
    _id: faker.random.alphaNumeric(32),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: "12345678"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: jest.fn()
        },
        {
          provide: UserService,
          useValue: {
            findOne: async () => {
              return {
                ...userPayload,
                password: await bcrypt.hash(userPayload.password, 10)
              };
            },
            create: () => userPayload
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => {
              return faker.random.alphaNumeric(100);
            }
          }
        },
        AuthService
      ]
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("login", () => {
    it("should send a login user and token", async () => {
      expect(await authService.login(userPayload)).toMatchObject({
        user: {
          ...userPayload,
          password: expect.any(String)
        },
        access_token: expect.any(String)
      });
    });
  });

  describe("validate User", () => {
    it("should send a validate user", async () => {
      const { password, ...user } = userPayload;
      expect(await authService.validateUser(userPayload.email, userPayload.password)).toMatchObject(user);
    });
  });

  describe("Sign up", () => {
    it("should create a new user", async () => {
      expect(await authService.signup(userPayload)).toMatchObject(userPayload);
    });
  });
});