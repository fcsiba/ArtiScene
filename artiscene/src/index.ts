import {ArtisianApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {ArtisianApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ArtisianApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/explorer`);

  return app;
}
