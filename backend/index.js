import express from 'express';
import morgan from 'morgan';
import apiRoutes from './apiRoutes';
import fs from 'fs';
import { resolve } from 'path';

const { writeFile } = fs.promises;

const app = express();
const PORT = process.env.PORT || 50000;

// middleware
app.use(morgan('dev'));

// routes
app.use('/api', apiRoutes);

// global error handler and logger
app.use(async (error, req, res, next) => {
  const date = new Date(Date.now());
  const entry = `URL: ${req.url}
Date: ${date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })} ${date.toLocaleTimeString()}
Message: ${error.message}
Stack: ${error.stack}

`;

  await writeFile(resolve(__dirname, '../error-log.txt'), entry, { flag: 'a' });
  res.status(500).json({ message: error.message });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
