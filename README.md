# HTML5 Youbora Plugin
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)


## Folder Structure

```
/
├── dist/  Built & Minified files ready to include and run
├── gulp/  Build scripts
├── spec/  Jasmine tests
└── src/   Sourcecode of the project
```

## Documentation
Please refer to this developer's portal [post](http://developer.nicepeopleatwork.com/plugins/integration/js-browser/html5/).

## Installation


### Using NPM

If you want to use NPM to wrap youbora inside your project, use this command:

```
npm install --save youbora-html5-plugin
```

And then, inside your code:

```js
var youbora = require('youbora-html5-plugin')
```

### Using CDN

If you want to include our hosted file, please refer [here](http://developer.nicepeopleatwork.com/plugins/integration/).


## I need help!
If you find a bug, have a suggestion or need assistance send an E-mail to <support@nicepeopleatwork.com>


## Contribute
Fork the repo and run the following command:

```
npm install
npm run build
```

This will install and execute gulp build. Develop your changes and open a pull-request.

### Publishing changes
Once a change is done (or a pull request merged) NPAW will run this scripts:

Run the following script to update the version & tag this repo.

`npm version NEW_VERSION`

Then run this to publish it to npm (version must be unique).

`npm publish`