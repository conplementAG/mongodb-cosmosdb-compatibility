import { connect, connection as _connection } from 'mongoose';

class DBConnectionFactory {

    async create() {
        await connect(process.env.DB_CONNSTR, {
            auth: {
              user: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD
            },
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        return _connection;
    }

    async closeConnection(){
        await _connection.close();
    }
}

export default new DBConnectionFactory();