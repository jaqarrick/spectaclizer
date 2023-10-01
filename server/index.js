const api = require('./api');
const worker = require('./worker');

const bootstrap = async () => {
  await worker();
  api();
};

bootstrap();
