import mysql from 'mysql';

const database = (() => {
  let connection: mysql.Connection

  const connect = (): Promise<mysql.Connection> => {
    return new Promise((resolve, reject) => {
      if (connection) {
        return resolve(connection)
      }
      connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Alehap@664',
        database: 'e_commerce',
        port: 3306,
      });
      connection.connect((err) => {
        if(err) {
          return reject(err)
        }
        console.log('Connected DB');
        return resolve(connection);
      })
    })
  }
  return {
    connect,
  }
})()

export default database