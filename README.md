# Smart Error

Show rich error messages during development and vague messages in production.

[![Build Status](https://travis-ci.org/flasd/smart-error.svg?branch=master)](https://travis-ci.org/flasd/cpf-check)
[![Coverage Status](https://coveralls.io/repos/github/flasd/smart-error/badge.svg?branch=master)](https://coveralls.io/github/flasd/smart-error?branch=master)
[![npm version](https://badge.fury.io/js/smart-error.svg)](https://www.npmjs.com/package/smart-error)
[![npm downloads per month](https://img.shields.io/npm/dm/@flasd/smart-error.svg)](https://www.npmjs.com/package/@flasd/smart-error)

### Instalation

Install the latest version using NPM:

```sh
npm install @flasd/smart-error
```

### Usage

```javascript
import SmartError from "@flasd/smart-error";

throw new SmartError(/* regular error params */);
```

Additionaly you can pass a callback to get called anytime you call the constructor:

```javascript
import SmartError from "@flasd/smart-error";

SmartError.setReportFunction(error => {
  // do your magic! You can throw erros here, we'll catch them for you.
  // this function can even be async (return a promise!)

  console.error(error);
});

throw new SmartError("miau");
// VM1:1 Uncaught Error: miau
//  at <anonymous>:1:7
//
```

If you'd want to remove the reporting listener:

```javascript
import SmartError from "@flasd/smart-error";

const removeListener = SmartError.setReportFunction(error => {});

removeListener();
```

### Copyright e Licença

Copyright (c) 2019 [Marcel de Oliveira Coelho](https://github.com/flasd) under the [MIT License](https://github.com/flasd/smart-error/blob/master/LICENSE.md). Go Crazy. :rocket: