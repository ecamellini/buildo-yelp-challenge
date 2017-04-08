# Yelp Restaurant Search

 An application that can be used to search for [Yelp](https://yelp.com) restaurants and food businesses near a given location. Built using [React](https://facebook.github.io/react/) (starting from [create-react-app](https://github.com/facebookincubator/create-react-app)), [Material-UI](http://www.material-ui.com/#/) and the [Yelp Fusion](https://www.yelp.it/developers/) API.

## Intallation

### Requirements

This app requires the following software:
* Node.js (7.8.0)
* npm (4.4.4)

To install them follow the instructions on the [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) official websites.

### Installation instructions

1. Install the the **requirements** listed above
2. Clone this repository
3. Move inside the cloned folder, open a terminal and execute the command `npm install` in order to install the project **dependencies**
4. Modify the file `src/yelp-api-config.js` and substitute the three placeholders:
    * `<YOUR_APP_ID>` and `<YOUR_APP_SECRET>` should be substituted with your Yelp Fusion API App ID and App Secret. You can generate them [here](https://www.yelp.it/developers/v3/manage_app).
    * `<YOUR_CORS_PROXY>` should be substituted with the base URL of your [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) proxy. It is needed because the API does not support CORS or JSONP, which means that it cannot be directly used in the front-end. Another solution would be to leave this field empty and to modify this app in order to perform the API calls on the server side.
5. Build the **production** version by executing the commnand `npm run build`.
6. Serve the app by executing `serve -s build` (install `serve` by running `npm install -g serve`, if you don't have it already)
7. Open the following address on your browser: [htpp://localhost:5000](htpp://localhost:5000). If you did everything correctly, you should be able to use the app.

## Development

To set up a development environment follow the same steps outlined in the **installation instructions**.
You can then modify or reuse the source code and run the app in development mode by executing the `npm start` command. 

**Note:** if you plan to publish your code on a repository you should also also run `git update-index --assume-unchanged src/yelp-api-config`, or an equivalent command for other version control systems. This will prevent your Yelp API App ID and Secret and your CORS proxy URL to be published on the repository.

### Contributing

You can contribute to this project by making a pull request. Follow the official GitHub pull requests [documentation](https://help.github.com/articles/about-pull-requests/) for more information.