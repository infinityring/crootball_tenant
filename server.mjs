import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'node:url';
import { handler as ssrHandler } from './dist/server/entry.mjs';
import dotenv from 'dotenv';

dotenv.config();

const app = Fastify({ logger: true });

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL('./dist/client', import.meta.url)),
  })
  .register(fastifyMiddie);
await app.use(ssrHandler);

await app.listen({ port: process.env.PORT || 4321, host: process.env.HOST || '0.0.0.0' });