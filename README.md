# protobuf-jsx

create statically generated message object from jsx

## Why

While we use statically generated javascript code,
we can't simply create `Message` object from plain object
due to missing `fromObject` method (as the reverse of `toObject`)

See more in [this issue](https://github.com/protocolbuffers/protobuf/issues/1591)

Before official support for `fromObject` method, we can use `protobuf-jsx` as a friendly workaround.

## Installation

```bash
npm i -S protobuf-jsx
```

## Usage

1. Enable `jsx` in `tsconfig.json`

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "Protobuf.createMessage"
  }
}
```

> If you don't use TypeScript, check out how to register jsx factory for your tool chain.

2. Write `jsx` in your javascript file.

```js
import Protobuf from '../src';
import { Feature, Point } from './fixtures/static_codegen/route_guide_pb';

const feature: Feature = (
  <Feature name="hello" location={<Point {...point} />}></Feature>
);

// or using children render function

const feature: Feature = (
  <Feature name="hello">{() => ({ location: <Point {...point} /> })}</Feature>
);
```

## Work with eslint

The following configurations prevent variables used in JSX to be marked as unused.

````yml
rules:
  react/jsx-uses-vars: 2
plugins:
  - react```
````
