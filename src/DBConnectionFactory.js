import { connect, connection as _connection } from 'mongoose';

class DBConnectionFactory {

    constructor() {
        this._connection = undefined;
    }

    async createMongoDBConnection() {
        this._connection = await connect(process.env.MONGODB_CONNSTR, { useNewUrlParser: true } );
    }
    
    async createCosmosDBConnection() {
        this._connection = await connect(process.env.COSMODB_CONNSTR, {
            auth: {
              user: process.env.USERNAME,
              password: process.env.PASSWORD
            }
        })
    }

    async closeConnection(){
        if(this._connection.close){
            await this._connection.close();
        }
    }
}

export default new DBConnectionFactory();