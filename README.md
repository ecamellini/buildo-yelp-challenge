# Yelp Restaurant Search

 An application that can be used to search for [Yelp](https://yelp.com) restaurants and food businesses near a given location. Built using [React](https://facebook.github.io/react/) (starting from [create-react-app](https://github.com/facebookincubator/create-react-app)), [Material-UI](http://www.material-ui.com/#/) and the [Yelp Fusion](https://www.yelp.it/developers/) API.

## Intallation

### Requirements

This app requires the following software:
* Node.js (7.8.0)
* npm (4.4.4)

To install it follow the instructions on the [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) official websites.

### Installation instructions

1. Install the the **requirements** listed above;
2. Clone the [repository](https://github.com/ecamellini/buildo-yelp-challenge) by opening a terminal and executing the command `git clone` followed by the repository url (if you don't have git, you can get it [here](https://git-scm.com/));
3. Move inside the cloned folder, open a terminal and execute the command `npm install` in order to install the project **dependencies**;
4. Modify the file `src/yelp-api-config.js` and substitute the three placeholders:
    * `<YOUR_APP_ID>` and `<YOUR_APP_SECRET>` should be substituted with your Yelp Fusion API App ID and App Secret. You can generate them [here](https://www.yelp.it/developers/v3/manage_app);
    * `<YOUR_CORS_PROXY>` should be substituted with the base URL of your [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) proxy. It is needed because the API does not support CORS or JSONP, which means that it cannot be directly used in the front-end. Another solution would be to leave this field empty and to modify this app in order to perform the API calls on the server side (this app has no server, so you should also build one);
5. Build the **production** version by executing the commnand `npm run build`
6. Serve the app by executing `serve -s build` (install `serve` by running `npm install -g serve`, if you don't have it already);
7. Open the following address on your browser: [htpp://localhost:5000](htpp://localhost:5000). If you did everything correctly, you should now be able to use the app.

## Development

To set up a development environment follow the same steps outlined in the **installation instructions**.
You can then modify or reuse the source code and run the app in development mode by executing the `npm start` command. 

**Note:** if you plan to publish your code on a repository you should also also run `git update-index --assume-unchanged src/yelp-api-config`, or an equivalent command for other version control systems. This will prevent your Yelp API App ID and Secret and your CORS proxy URL to be published on the repository.

### Contributing

You can contribute to this project by making a pull request. Follow the official GitHub pull requests [documentation](https://help.github.com/articles/about-pull-requests/) for more information. 

## User Manual

The User Interface contains four main components: an **app bar**, an **input area**, a **results page** and a **details** page. These components are described below:

* From the *always-visible* **app bar** it is possible to open the left drawer, by tapping on the left icon. The drawer contains credits information and a link to the source code repository.

* The *always-visible* **input area** contains a search bar and a slider that the can be used to enter a location and select a range, respectively. Press `ENTER` while typing in the search bar to request the results; changes in the range directly reflect on the displayed results. The location can also be entered in the format `latitude, longitude`.

* In the **results page** it is possible to scoll down and, if necessary, show more results by clicking on the corresponding button. A click on one of the displayed businesses results in the redirection to the business details page. While scolling, a button to go back to the top of the page will be displayed.

* The **item details page** can be accessed by clicking on one of the results. It shows the selected item information. If the item comes with an image, it is possible to display it by tapping on the top-left arrow, while the Yelp logo redirects to the corresponding Yelp page. The left arrow can be used to return to the results list. 

## Problems

The default configuration of [create-react-app](https://github.com/facebookincubator/create-react-app) does not pass the node modules that the project requires through [Babel](https://babeljs.io/). This causes the `npm run build` command to fail when using the yelp fusion API implementation available on npm ([this module](https://www.npmjs.com/package/yelp-fusion), which is also the one used in the [official example](https://github.com/Yelp/yelp-fusion)). I think it is because it was not meant to be used in the front-end. Eventually, I decided to implement the API interaction by myself.