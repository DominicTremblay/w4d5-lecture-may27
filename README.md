# W4D5 Lecture

## JWT

- Authentication with JSON Web Token
- Token based authentication
- Useful for SPAs

### Why JWT

- Provides stateless authentication solution.
- Can use a third-party autentication server like OAuth, Facebook, Google
- Easy to verify jwt token.

### Process

- Let's see the diagram in this article:
  [5 Easy Steps to Understanding JSON Web Tokens (JWT)](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)

- Steps are the following:

1. User Requests Access with Username / Password
2. Application validates credentials
3. Application provides a signed token to the client
4. Client stores that token and sends it along with every request
5. Server verifies token and responds with data

### Structure of JWT

The token is composed of a

- header
- payload
- signature

Simply put, a JWT is just a string with the following format:

- header.payload.signature

  Header:
  {
  "typ": "JWT",
  "alg": "HS256"
  }

  type = type of token
  alg = hash algorithm

  Payload

  The payload component of the JWT is the data that‘s stored inside the JWT (this data is also referred to as the “claims” of the JWT)
  {
  "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"
  }

  Signature

  Hash of the data and the secret key

## References

- [jwt.io](https://jwt.io/introduction/)
- [a-practical-guide-for-jwt-authentication](https://medium.com/swlh/a-practical-guide-for-jwt-authentication-using-nodejs-and-express-d48369e7e6d4)
- [cookies vs tokens](https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide)
