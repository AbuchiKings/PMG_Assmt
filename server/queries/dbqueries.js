
const query = {
    regUser(username, password) {
        return ({
            text: `INSERT INTO testuser (username, password)
                VALUES($1, $2)`,

            values: [
                username,
                password
            ]
        })
    },

    createUser(firstname, lastname, gender, date_of_birth, dateCreated) {
        return ({
            text: `INSERT INTO users (firstname, lastname, gender, date_of_birth, date_created)
                VALUES($1, $2, $3, $4, $5) RETURNING *`,

            values: [firstname, lastname, gender, date_of_birth, dateCreated]
        })
    },

    getUserById(id) {
        return ({
            text: `SELECT * FROM users WHERE id = $1`,
            values: [id]
        })
    },

    getAllUsers(query, offset) {
        let { sort_field, sort_order_mode, filter_field, filter_value, page_size } = query;
        let sql = `SELECT * FROM users `;

        if (filter_field && filter_value) {
            sql += `WHERE LOWER(${filter_field}) LIKE $1 `;
        }
        if (sort_field && sort_order_mode) {
            sql += `ORDER BY ${sort_field} ${sort_order_mode} `;
        }

        if (page_size) {
            sql += `LIMIT ${page_size} `;
        }

        if (offset) {
            sql += `OFFSET ${offset} `;
        }

        return ({
            text: sql,
            values: [`${'%' + filter_value.toLowerCase() + '%'}`]
        })
    },

    updateUser(firstname, lastname, gender, date_of_birth, dateUpdated, id) {
        return ({
            text: `UPDATE users SET
            firstname = COALESCE($1, firstname), 
            lastname = COALESCE($2, lastname), 
            gender = COALESCE($3, gender), 
            date_of_birth = COALESCE($4, date_of_birth), 
            date_updated = COALESCE($5, date_updated)
            WHERE id = $6 RETURNING *`,
            values: [firstname, lastname, gender, date_of_birth, dateUpdated, id]
        })
    },

    deleteUser(id) {
        return ({
            text: `DELETE FROM users WHERE id = $1 RETURNING *`,
            values: [id]
        })
    }

};

module.exports = query;

