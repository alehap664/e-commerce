
import express from 'express';
import database from './database';
import UserRoute from './router/users'
import AuthRoute from './router/auth'

const app = express();

(async () => {
  try {
    require('dotenv').config()
    app.use(require('cors')())
    app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
    const PORT = process.env.PORT || 5000

    app.listen(PORT, async () => {
      await database.connect()
      console.log(`App listen on port ${PORT}`);

      app.use('/api/users', UserRoute)
      app.use('/api/auth', AuthRoute)
    })
    
  } catch (error) {
    console.log('error', error);
  }

})()


