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
    invalidEmailAddress:{
        email: 'jamespatrickyahoo.com',
        password: 'qwerty',
    },
    emptyPassowrd:{
        email: 'jamespatrick@yahoo.com',
        password: '',
    },
    invalidPassword:{
        email: 'jamespatrick@yahoo.com',
        password: 'sfgerty',
    },
    unregisteredUser:{
        email: 'jamespatrick@mockshop.com',
        password: 'sfgerty',
    },
    validDetails:{
        email: 'jamespatrick@yahoo.com',
        password: 'qwerty',
    }
};

const updatePassword = {
    emptyPasswordFields:{
        oldPassword: '',
        newPassword: ''
    },
    equalPasswordInputs:{
        oldPassword: 'qwerty',
        newPassword: 'qwerty'
    },
    incorrectPassword:{
        oldPassword: 'qwerty',
        newPassword: 'qwerty'
    },
}


export default {
    login,
    signUp
    // modifyUser,
    // category,
    // products,
    // newSale,
    // invalidProductEntry,
    // validProductEntry
};