# Smart Error

Show rich error messages during development and vague messages in production.

## Instalation

```sh
npm install @flasd/smart-error
```

## Usage
```javascript
import SmartError from '@flasd/smart-error';

throw new SmartError(/* regular error params */);
```

Additionaly you can pass a callback to get called anytime you call the constructor:

```javascript
import SmartError from '@flasd/smart-error';

SmartError.setReportFunction((error) => {
  // do your magic! You can throw erros here, we'll catch them for you.
  // this function can even be async (return a promise!)

  console.error(error);
});

throw new SmartError('miau');
// VM1:1 Uncaught Error: miau
//  at <anonymous>:1:7
//
```

If you'd want to remove the reporting listener:

```javascript
import SmartError from '@flasd/smart-error';

const removeListener = SmartError.setReportFunction((error) => {});

removeListener();
```