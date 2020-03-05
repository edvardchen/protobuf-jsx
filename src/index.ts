import { camelCase } from 'lodash';
import { Message } from 'google-protobuf';

// support fromDate
const methodGenerators = [
  (key: string) => `set ${key}`,
  (key: string) => `from ${key}`,
];

function inject<T extends Message>(
  message: T,
  pojo: { [key: string]: unknown }
) {
  Object.entries(pojo).forEach(([key, value]) => {
    methodGenerators.some(generator => {
      const method = camelCase(generator(key));
      // @ts-ignore
      if (typeof message[method] === 'function') {
        // @ts-ignore
        message[method](value);
        // break;
        return true;
      }
    });
  });
}

type JSON = {
  [key: string]: unknown;
};

/**
 * create Message from plain object
 */
function createMessage<T extends Message>(
  Message: new () => T,
  attributes: JSON | null,
  children?: (...rest: any[]) => JSON
): T {
  const result = new Message();

  if (attributes) {
    inject(result, attributes);
  }

  if (typeof children === 'function') {
    inject(result, children());
  }

  return result;
}

export default {
  createMessage,
};
