const queries = {

    regUser(firstName, lastName, email, hashpassword, isAdmin) {
        return ({
            text: `INSERT INTO users (first_name, last_name, 
                email, password, is_admin)
                VALUES($1, $2, $3, $4, $5,) RETURNING *`,

            values: [
                firstName,
                lastName,
                email,
                hashpassword,
                isAdmin
            ]
        })
    },

    
}

export default queries;