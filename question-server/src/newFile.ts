import { app } from '.';
import { connectToDatabase } from './services/database.service';

connectToDatabase()
  .then(() => {
    app.use('/games', gamesRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
