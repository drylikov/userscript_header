


# userscript_header


Generate userscript header from package.json.

### Usage

Example `package.json` :

```json
{
  "name": "my-userscript",
  "version": "0.1.0",
  "description": "Userscript description",
  "author": "Author",
  "license": "MIT",
  "devDependencies": {
    "gulp": "^3.9.1"
  },
  "userscript": {
    "name": "My userscript name",
    "description": "My userscript description",
    "author": "Toast",
    "namespace": "http://www.spawnkill.fr",
    "match": "*://*.toast.tld/*",
    "grant": [
      "GM_addStyle",
      "GM_setClipboard"
    ],
    "run-at": "document-start"
  }
}

```

```js
var UserscriptHeader = require('userscript-header');

var userscriptHeader = UserscriptHeader.fromPackage('./package.json');

userscriptHeader.getData();

// Returns :

// {
//   'name': 'My userscript name',
//   'author': 'Toast',
//   'version': '0.1.0',
//   'description': 'My userscript description',
//   'namespace': 'http://www.spawnkill.fr',
//   'match': '*://*.toast.tld/*',
//   'grant': [
//      'GM_addStyle',
//      'GM_setClipboard',
//   ],
//   'run-at': 'document-start',
// }


console.log(header.toString());

// Output :

// ==UserScript==
// @name My userscript name
// @author Toast
// @version 0.1.0
// @description My userscript description
// @namespace http://www.spawnkill.fr
// @match *://*.toast.tld/*
// @grant GM_addStyle
// @grant GM_setClipboard
// @run-at document-start
// ==/UserScript==
```

When present, `package.userscript.{name|version|description|author}`, respectively override `package.{name|version|description|author}`.
