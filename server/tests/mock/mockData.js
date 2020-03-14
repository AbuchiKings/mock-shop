const signUp = {
  invalidNewUser: {
    firstName: 'Ja',
    lastName: ' ',
    email: 'blah@domain',
    password: 'qwe',
    isAdmin: 'Yes'
  },
  invalidEmailAddress: {
    firstName: 'James',
    lastName: 'Patrick',
    email: 'jamespatrick.com',
    password: 'qwerty',
    isAdmin: true
  },
  usedEmailAddress: {
    firstName: 'James',
    lastName: 'Patrick',
    email: 'abuchikings@mockshop.com',
    password: 'qwerty',
    isAdmin: false
  },
  validUserSignup: {
    firstName: 'James',
    lastName: 'Patrick',
    email: 'jamespatrick@yahoo.com',
    password: 'qwerty',
    isAdmin: true
  },

};

const login = {
  invalidEmailAddress: {
    email: 'jamespatrickyahoo.com',
    password: 'qwerty',
  },
  emptyPassowrd: {
    email: 'jamespatrick@yahoo.com',
    password: '',
  },
  invalidPassword: {
    email: 'jamespatrick@yahoo.com',
    password: 'sfgerty',
  },
  unregisteredUser: {
    email: 'jamespatrick@mockshop.com',
    password: 'sfgerty',
  },
  validDetails: {
    email: 'jamespatrick@yahoo.com',
    password: 'qwerty',
  }
};

const updatePassword = {
  emptyPasswordFields: {
    oldPassword: '',
    newPassword: ''
  },
  equalPasswordInputs: {
    oldPassword: 'qwerty',
    newPassword: 'qwerty'
  },
  incorrectOldPassword: {
    oldPassword: 'derty',
    newPassword: 'qwerty'
  },
  invalidPasswordsLength: {
    oldPassword: 'qwerty',
    newPassword: 'qwer'
  },
  validDetails: {
    oldPassword: 'qwerty',
    newPassword: 'inflames'
  }
};

const products = {
  validProduct: {
    description: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    name: 'Cristian Gilbanks',
    price: 30.99,
    imageUrl: 'http://example.com/photo.jpg',
    category: 'Electronics',
    inStock: 'true'
  },
  invalidProduct: {
    description: 'Etiam.',
    name: 'g',
    price: 'khdg',
    imageUrl: 'http://example.',
    category: '',
    inStock: ' '
  },
};


export default {
  login,
  signUp,
  updatePassword,
  products,
  // newSale,
  // invalidProductEntry,
  // validProductEntry
};
