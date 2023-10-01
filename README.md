This project is built using NestJS, a progressive framework for building efficient, scalable, and enterprise-grade Node.js applications. 

## Installation
To install this project and its dependencies, clone the repository and run the following commands:

```
$ pnpm install
$ pnpm run build
```
## Scripts
The following scripts are available:
- `prebuild` - removes the `dist` directory before building the project
- `build` - builds the project
- `postbuild:prod` - copy json files from `src` to `dist` directory
- `build:prod` - compiles files to `js` in the `dist` directory for production
- `preinstall` - allows only `pnpm` package manager to be used
- `format` - formats the source code using Prettier
- `start` - starts the application
- `start:dev` - starts the application in development mode using `ts-node`
- `watch:dev` - starts the application in development mode with auto-restart using `ts-node-dev`
- `start:debug` - starts the application in debug/watch mode
- `start:prod` - starts the compiled production code
- `typeorm` - runs TypeORM CLI using `ts-node-esm`
- `migration:generate` - generates a new migration file
- `migration:run` - runs all pending migrations
- `migration:create` - creates a new migration file with a given name
- `migrate:down` - reverts the last applied migration
- `migration:revert` - reverts all applied migrations
- `lint` - lints the code using ESLint
- `test` - runs Jest tests
- `test:watch` - runs Jest tests in watch mode
- `test:cov` - runs Jest tests with code coverage
- `test:debug` - runs Jest tests in debug mode
- `test:e2e` - runs end-to-end (e2e) tests

## Dependencies
The following dependencies are included in this project:
- `@nestjs/common`^9.0.0
- `@nestjs/config`^2.2.0
- `@nestjs/core`^9.0.0
- `@nestjs/cqrs`^9.0.1
- `@nestjs/jwt`^9.0.0
- `@nestjs/passport`^9.0.0
- `@nestjs/platform-express`^9.0.0
- `@nestjs/swagger`^6.1.4
- `@nestjs/typeorm`^9.0.1
- `@server/constants` - workspace dependency
- `@server/utils` - workspace dependency
- `@types/lodash`^4.14.191
- `@types/passport-jwt`^3.0.7
- `bcrypt`^5.0.1
- `class-transformer`^0.5.1
- `class-validator`^0.13.2
- `cloudinary`^1.34.0
- `cookie-parser`^1.4.6
- `crypto`^1.0.1
- `dotenv-extended`^2.9.0
- `fs`^0.0.1-security
- `lodash`^4.17.21
- `moment`^2.29.4
- `passport`^0.6.0
- `passport-jwt`^4.0.0
- `passport-local`^1.0.0
- `pg`^8.8.0
- `reflect-metadata`^0.1.13
- `rimraf`^3.0.2
- `rxjs`^7.2.0
- `sharp`^0.31.3
- `ts-node-dev`^2.0.0
- `typeorm`^0.3.10
- `uuid`^9.0.0
- `webpack`^5.0.0
- `yaml`^2.2.1

## Dev Dependencies
The following development dependencies are included in this project:
- `@nestjs/cli`^9.0.0
- `@nestjs/schematics`^9.0.0
- `@nestjs/testing`^9.0.0
- `@pnpm/find-workspace-packages`^5.0.18
- `@pnpm/logger`^5.0.0
- `@pnpm/types`^8.10.0
- `@types/cookie-parser`^1.4.3
- `@types/express`^4.17.13
- `@types/express-session`^1.17.5
- `@types/jest`^28.1.8
- `@types/node`^16.0.0
- `@types/passport-local`^1.0.34
- `@types/sharp`^0.31.1
- `@types/supertest`^2.0.11
- `@types/uuid`^8.3.4
- `@typescript-eslint/eslint-plugin`^5.0.0
- `@typescript-eslint/parser`^5.0.0
- `eslint`^8.0.1
- `eslint-config-prettier`^8.3.0
- `eslint-plugin-import`^2.26.0
- `eslint-plugin-prettier`^4.0.0
- `jest`^28.1.3
- `prettier`^2.3.2
- `source-map-support`^0.5.21
- `supertest`^6.1.3
- `ts-jest`^28.0.8
- `ts-loader`^9.2.3
- `ts-node`^10.9.1
- `tsconfig-paths`4.1.0
- `typescript`^4.7.4

## Testing
This project uses Jest as its test runner. To run the tests, execute the following command:

```
$ npm run test
```

## License
This project is [UNLICENSED](LICENSE).
