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
    invalidPassword:{
        email: 'jamespatrick@yahoo.com',
        password: '  ',
    }
};



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