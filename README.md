# Experimental Geometry of Starlight Scene
[![Build Status](https://travis-ci.org/maine-imre/aframe-starlight-geometry.svg?branch=main)](https://travis-ci.org/maine-imre/aframe-starlight-geometry)
[![CodeFactor](https://www.codefactor.io/repository/github/maine-imre/aframe-starlight-geometry/badge)](https://www.codefactor.io/repository/github/maine-imre/aframe-starlight-geometry)

Implemented in AFRAME.  More to come

## Publishing your scene

This automatically pubishes through TravisCI to github.io.

<hr>

To know which GitHub repo to deploy to, the `deploy` script first looks at the optional [`repository` key](https://docs.npmjs.com/files/package.json#repository) in the [`package.json` file](package.json) (see [npm docs](https://docs.npmjs.com/files/package.json#repository) for sample usage). If the `repository` key is missing, the script falls back to using the local git repo's remote origin URL (you can run the local command `git remote -v` to see all your remotes; also, you may refer to the [GitHub docs](https://help.github.com/articles/about-remote-repositories/) for more information).

<hr>

## Still need Help?

### Installation

First make sure you have Node installed.

On Mac OS X, it's recommended to use [Homebrew](http://brew.sh/) to install Node + [npm](https://www.npmjs.com):

    brew install node

To install the Node dependencies:

    npm install


### Local Development

To serve the site from a simple Node development server:

    npm start

Then launch the site from your favourite browser:

[__http://localhost:3000/__](http://localhost:3000/)

If you wish to serve the site from a different port:

    PORT=8000 npm start


## License

This program is free software and is distributed under an [MIT License](LICENSE).
