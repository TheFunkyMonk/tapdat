# tapdat

> **Note:** tapdat is currently under active development, and not yet ready to use!

![](screenshot.png)

## Synopsis

tapdat is a digital tap list application, powered by [Contentful](https://www.contentful.com).

## Features
* Built on top of the [Yeoman Webapp Generator](https://github.com/yeoman/generator-webapp)
* Includes Gulp / Sass / Handlebars
* Built to consume [Contentful](https://www.contentful.com) APIs

## Installation

### Contentful

* Coming soon

### Configuration

* In order to keep API keys private, you'll need to create your own `config.js` that includes vars for your Contentful Access Token / Space ID. This file is not tracked.

`app/scripts/config.js`
```language-javascript
var myAccessToken = 'your-token',
    mySpaceId = 'your-space-id';
```

### Running the app

* Run `gulp serve` to preview and watch for changes
* Run `gulp` to build your webapp for production

## Contributors

Just let me know if you'd like to contribute!

## License

Licensed under the [GPL 3.0](http://www.gnu.org/licenses/gpl.txt). You are encouraged to link back to [my web site](http://rjlacount.com), and/or [this GitHub repository](https://github.com/TheFunkyMonk/tapdat) if you find this at all useful.
