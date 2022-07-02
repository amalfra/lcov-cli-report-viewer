Lcov CLI report viewer
========
[![npm version](https://badge.fury.io/js/lcov-cli-report-viewer.svg)](https://badge.fury.io/js/lcov-cli-report-viewer)
![Build Status](https://github.com/amalfra/lcov-cli-report-viewer/actions/workflows/test.yml/badge.svg?branch=main)

Lcov CLI report viewer is a commandline tool to generate CLI reports from lcov format file. It generates a pretty report from provided lcov file as shown below.

![output demo](https://raw.githubusercontent.com/amalfra/lcov-cli-report-viewer/master/.images/output-demo.png)

## Installation
Run following command
```sh
npm install -g lcov-cli-report-viewer
```
**lcov-cli-report-viewer** command will now be available in your shell.

## Usage
Pass the path to lcov format file as commandline argument to **lcov-cli-report-viewer** command. For eg:
```sh
lcov-cli-report-viewer /Users/amal/reports/info.lcov
```
#### Options supported
* --filter-path / -fp

This can be used to show only file matching provided path pattern
```sh
lcov-cli-report-viewer --filter-path "src/modules/handlers/*" /Users/amal/reports/info.lcov 
```

## Development
Questions, problems or suggestions? Please post them on the [issue tracker](https://github.com/amalfra/lcov-cli-report-viewer/issues).

You can contribute changes by forking the project and submitting a pull request. Feel free to contribute :heart_eyes:

## UNDER MIT LICENSE

The MIT License (MIT)

Copyright (c) 2019 Amal Francis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
