import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request = require("supertest");
import { AppModule } from "../../app.module";
import { faker } from "@faker-js/faker";

describe("Auth (e2e)", () => {
  const gql = "/graphql";
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const payload = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: "12345678"
  };

  describe("Sign Up", () => {
    it("can sign up as new user", () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: "mutation Signup($signupInput:SignupInput!){signup(signupInput:$signupInput){name email password}}",
          variables: `{"signupInput":${JSON.stringify(payload)}}`
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.signup).toEqual({
            ...payload,
            password: expect.any(String)
          });
        });
    });
  });

  describe("Login", () => {
    it("can login as user", () => {
      const loginPayload = { username: payload.email, password: payload.password };

      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: "query Login($loginInput: LoginInput!) { login(loginInput: $loginInput) { user { _id name email } access_token  }}",
          variables: `{"loginInput": ${JSON.stringify(loginPayload)}}`
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.login).toEqual({
            user: {
              _id: expect.any(String),
              name: payload.name,
              email: payload.email
            },
            access_token: expect.any(String)
          });
        });
    });
  });
});