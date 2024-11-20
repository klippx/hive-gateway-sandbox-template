
import { exec } from 'child_process';
import assert from 'node:assert';
import path from 'path';
import * as url from 'url';
import { log } from './logger.js';
import { waitForServices } from './local-service-list.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const hivePath = path.join(__dirname, '../node_modules/.bin/hive');

function runCommand(
  command: string,
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve({ stdout, stderr });
    });
  });
}

export async function createSupergraphSchema() {
  log.info('Ensuring DGSs are up...');
  const services = await waitForServices(30000).catch((e) => {
    log.error('One or more DGSs are not responding!');
    throw e;
  });

  log.info('Composing supergraph.graphql...');
  const hasExternal = services.find((s) => s.url.includes('https'));
  // If we need to compose supergraph with external sources, we are required to have a token
  if (hasExternal) {
    assert(
      process.env.HIVE_TOKEN,
      'Cannot compose supergraph schema: Missing env variable HIVE_TOKEN',
    );
  }
  const servicesOption = services
    .map((service) => `--service ${service.name} --url ${service.url}`)
    .join(' ');
  const cmd = `${hivePath} dev --write=supergraph.graphql ${servicesOption}`;
  await runCommand(cmd)
    .then(() => {
      log.info(' ✔ Composition successful.');
    })
    .catch(log.error);
}
