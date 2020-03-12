# Mock-shop

[![Build Status](https://travis-ci.com/AbuchiKings/mock-shop.svg?branch=develop)](https://travis-ci.com/AbuchiKings/mock-shop)
[![Coverage Status](https://coveralls.io/repos/github/AbuchiKings/mock-shop/badge.svg?branch=develop)](https://coveralls.io/github/AbuchiKings/mock-shop?branch=develop)
<a href="https://codeclimate.com/github/AbuchiKings/mock-shop/maintainability"><img src="https://api.codeclimate.com/v1/badges/1f72700e4640352cde62/maintainability" /></a>


Mock-shop is a simple API for an online store.


## Links
> [API Documentation](https://abuchikings-mockshop.herokuapp.com/docs).


## Implemented Features
* User can sign up
* User can sign in
* Admin can add a product
* Admin can delete a product
* Admin can edit a product
* User  can get all products
* User can get a specific product
* User can add product to cart
* User can remove product from cart
* User can get all products in cart
* User can delete account


## API Endpoints

### basepath `https://abuchikings-mockshop.herokuapp.com/api/v1`


* POST  Create a user account               (/auth/signup)
* POST  User login                          (/auth/login)
* PATCH Update user password                (/users/update-password/:id)
* DELETE Delete user                        (/users/:id)
* POST Create product                       (/products)
* PATCH Update product                      (/products/:id)
* GET All products                          (/products)
* GET Single product                        (/products/:id)
* DELETE Delete product                     (/products/:id)
* PUT Add product to cart                   (/cart)
* GET Cart                                  (/cart)
* DELETE Cart                               (/cart)


## Technologies Used

* [Node.js](https://nodejs.org) - A runtime environment based off of Chrome's V8 Engine for writing Javascript code on the server.
* [PostgreSQL](https://www.postgresql.org) - An Object relational database from Elephant SQL.
* [Express.js](https://expressjs.com) - A Node.js framework.
* [Babel](https://babeljs.io) - Javascript transpiler.
* [Eslint](https://eslint.org/) - Javascript linter. 
* [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style [guide](https://github.com/airbnb/javascript) was followed.
* [Postman](https://www.getpostman.com/) - API testing environment.

### Testing tools
* [Mocha](https://mochajs.org/) - A Javascript test framework.
* [Chai](http://chaijs.com) - Assertion library.
* [nyc](https://github.com/istanbuljs/nyc) - Istanbul's command line interface.



## Authors
*  Abuchi Kingsley Ndinigwe