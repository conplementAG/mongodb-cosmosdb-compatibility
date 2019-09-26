import { connect, connection as _connection } from 'mongoose';

class DBConnectionFactory {

    constructor() {
        this._connection = undefined;
    }

    async create(connType) {
        if(connType == "MongoDB"){
            return await this.createMongoDBConnection();
        }
        else if(connType == "CosmoDB"){
            return await this.createCosmosDBConnection();
        }
        else {
            throw "No valid connection type available";
        }
    }

    async createMongoDBConnection() {
        this._connection = await connect(process.env.DB_CONNSTR, { useNewUrlParser: true } );
        return this._connection;
    }
    
    async createCosmosDBConnection() {
        this._connection = await connect(process.env.DB_CONNSTR, {
            auth: {
              user: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD
            }
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