const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { processingErrors } = require('./middlewares/errors');
const { isAuthorized } = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { PORT, MONGOOSE_DB_URL, origin } = require('./utils/constants');
const { indexRouters } = require('./routes/index');
const limiter = require('./utils/rateLimit');

const app = express();

app.use(limiter);
app.use(helmet());
app.use(cors({ origin: [origin] }));
app.use(express.json());

mongoose.connect(MONGOOSE_DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(indexRouters);

app.use(isAuthorized, (_req, _res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());

app.use(processingErrors);

app.listen(PORT);
