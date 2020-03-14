const notFoundUser = {
  command: 'SELECT',
  rowCount: 0,
  oid: null,
  rows: [],
  fields: []
};
const foundUser = {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows:
        [{
          id: 9,
          first_name: 'James',
          last_name: 'Patrick',
          email: 'jamespatrick@gmail.com',
          password:
                '$2b$10$YFz1L5SleQxXsCfQJql1ru6SAV2wla06xceuhOKwulFP6L15NIv/y',
          is_admin: true,
          registered: '2020 - 03 - 05T23: 00: 00.000Z'
        }],
  fields: []
};
const owner = {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows:
        [{
          id: 1,
          first_name: 'James',
          last_name: 'Patrick',
          email: 'jamespatrick@gmail.com',
          password:
                '$2b$10$YFz1L5SleQxXsCfQJql1ru6SAV2wla06xceuhOKwulFP6L15NIv/y',
          is_admin: true,
          registered: '2020 - 03 - 05T23: 00: 00.000Z'
        }],
  fields: []
};
const user = {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows:
        [{
          id: 6,
          first_name: 'James',
          last_name: 'Patrick',
          email: 'jamespatrick@hotmail.com',
          password:
                '$2b$10$YFz1L5SleQxXsCfQJql1ru6SAV2wla06xceuhOKwulFP6L15NIv/y',
          is_admin: false,
          registered: '2020 - 03 - 05T23: 00: 00.000Z'
        }],
  fields: []
};

export default {
  foundUser, notFoundUser, owner, user
};
