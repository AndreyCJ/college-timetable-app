// Requirements
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const path = require('path');
const AdminBro = require('admin-bro');
const cors = require('cors');
// const helmet = require('helmet');

const classTimetable = require('./routes/classTimetable.router');
const callsTimetable = require('./routes/callsTimetable.router');
const calls = require('./routes/calls.router');
const weekRouter = require('./routes/week.router');
const adminRouter = require('./routes/admin.router');
const options = require('./admin/admin.options');

const MONGO_URL = config.get('mongoUri');
const PORT = process.env.PORT || config.get('port');

// express server definition
const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(helmet());

// Router initialization
app.use(classTimetable);
app.use(callsTimetable);
app.use(calls);
app.use(weekRouter);
// app.use('/timetable-admin', adminRouter);

// Serve static assets if production
if (process.env.NODE_ENV === 'production') {
// Set static folder
  app.use(express.static('../build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'));
  });
}

// Running the server
const start = async () => {
  try {
    await mongoose.connect(MONGO_URL,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    const admin = new AdminBro(options);
    const router = adminRouter(admin);
    app.use(admin.options.rootPath, router);
    app.listen(PORT, () => console.log(`Timetable-Backend listening on port ${PORT}!`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
};

start();
