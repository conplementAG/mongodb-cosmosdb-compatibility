import { connect, connection as _connection } from 'mongoose';

class DBConnectionFactory {

    constructor() {
        this._connection = undefined;
    }

    async create() {
        this._connection = await connect(process.env.DB_CONNSTR, {
            auth: {
              user: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD
            },
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        return this._connection;
    }

    async closeConnection(){
        if(this._connection.close){
            await this._connection.close();
        }
    }
}

export default new DBConnectionFactory();