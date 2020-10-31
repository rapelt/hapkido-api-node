import {createConnection, getConnectionManager} from 'typeorm';

export const connectDB = async () => {
    const manager = getConnectionManager();

    if(manager.connections.length === 0) {
        await createConnection();
        console.log('TYPEORM connected', manager.connections.length);

    } else {
        manager.get('default')
        console.log('TYPEORM connected', manager.connections.length);
    }

};
