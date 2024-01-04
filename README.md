# Samples

`apps/`: executable applications and demos
- `example/`: an example of a projectional data manipulation DSL based on the TypeScript programming language, which is also available at <https://puredit.korz.dev/>
- `parser-playground/`: an experimentation playground used for debugging our pattern matching algorithm
- `python-dsl/`: an example of a projectional data manipulation DSL based on the Python programming language


## Develop
To develop all apps, install the dependencies using `npm install`.
Then, run the following command:

```
npm run dev
```

This will start development servers for `apps/example`, `apps/parser-playground` and `apps/python-dsl`.

## Linting and type checking
To lint and typecheck all apps, run the following command:

```
npm run lint
```

## Build
### All apps
To build all apps, run the following command:

```
npm run build
```

### Single app
The apps can also be built separately. This will be demonstrated for `apps/example`:

```sh
npm install
npm -w apps/example run dev
```

Alternatively, the app under `apps/example` can be built and run using [Docker](https://docs.docker.com/):

```sh
docker build -t puredit-example -f apps/example/Dockerfile .
docker run -p 3000:80 puredit-example
```

Afterwards, the example can be accessed in a browser on <http://localhost:3000>.

## Generator
With `example/` you can test the [@puredit/generator](https://github.com/puredit/generator). The folder `generator-input` contains three files with samples to generate projections. Run the following command to generate the `remove` projection for TypeScript:

```sh
npx @puredit/generator start \
    --language ts \
    --target-dir apps/example/src/ts/projections \
    --parser-module './parser' \
    --parser-name tsParser \
    --projection-name remove \
    --samples apps/example/generator-input/ts-remove.txt
```

Run the following command to generate the `take` projection for Python:
```sh
npx @puredit/generator start \
    --language py \
    --target-dir apps/example/src/py/projections \
    --parser-module './parser' \
    --parser-name pythonParser \
    --projection-name take \
    --samples apps/example/generator-input/py-take.txt
```

