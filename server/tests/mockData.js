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
        email: 'jamespatrick@gmail.com',
        password: 'qwerty',
        isAdmin: true
    },

};





export default {
    // login,
    signUp
    // modifyUser,
    // category,
    // products,
    // newSale,
    // invalidProductEntry,
    // validProductEntry
};