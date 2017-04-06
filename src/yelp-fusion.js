/**
 * MIT License

Copyright (c) 2016 tonybadguy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */


/**
 * This is a modified version of the yelp-fusion API client that can 
 * be found here: https://github.com/tonybadguy/yelp-fusion
 * 
 * The only difference is that it allows a proxy URL as parameter. The
 * proxy should be used to bypass the fact that the  Yelp API does not
 * support CORS.
 */


const _send = require('@tonybadguy/call-me-maybe');

class YelpClient {
  constructor(token, proxyUrl){
    this.token = token;
    this.proxyUrl = proxyUrl;
  }
  
  search(parameters, proxyUrl=this.proxyUrl){
    return _send({
      url: (proxyUrl ? proxyUrl : '') + 'https://api.yelp.com/v3/businesses/search',
      query: parameters,
      bearerToken: this.token
    });
  }

  phoneSearch(parameters, proxyUrl=this.proxyUrl){
    return _send({
      url: (proxyUrl ? proxyUrl : '') + 'https://api.yelp.com/v3/businesses/search/phone',
      query: parameters,
      bearerToken: this.token
    });
  }

  transactionSearch(transactionType, parameters, proxyUrl=this.proxyUrl){
    return _send({
      url: (proxyUrl ? proxyUrl : '') + 'https://api.yelp.com/v3/transactions/{transaction_type}/search',
      urlParams:{
        transaction_type: transactionType
      },
      query: parameters,
      bearerToken: this.token
    });
  }

  business(id, proxyUrl=this.proxyUrl){
    return _send({
      url: (proxyUrl ? proxyUrl : '') + 'https://api.yelp.com/v3/businesses/{id}',
      urlParams:{
        id: id
      },
      bearerToken: this.token
    });
  }

  reviews(businessId, proxyUrl=this.proxyUrl){
    return _send({
      url: (proxyUrl ? proxyUrl : '') + 'https://api.yelp.com/v3/businesses/{id}/reviews',
      urlParams:{
        id: businessId
      },
      bearerToken: this.token
    });
  }

  autocomplete(parameters, proxyUrl=this.proxyUrl){
    return _send({
      url: (proxyUrl ? proxyUrl : '') + 'https://api.yelp.com/v3/autocomplete',
      query: parameters,
      bearerToken: this.token
    });
  }
}

const accessToken = (clientId, clientSecret, proxyUrl) => {
  return _send({
    url: (proxyUrl ? proxyUrl : '') + 'https://api.yelp.com/oauth2/token',
    method: 'post',
    urlencodedBody: {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    }
  });
};

const createClient = (token, proxyUrl) => {
  return new YelpClient(token, proxyUrl);
};

module.exports = {
  client: createClient,
  accessToken: accessToken
};