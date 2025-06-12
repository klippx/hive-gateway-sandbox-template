import chalk from "chalk";
import { log } from "./logger.js";
import fetch, { type Response } from "node-fetch";

type Dgs = {
  port: number;
};

type DevConfig = {
  subgraphs: Record<string, Dgs>;
};

type Service = {
  name: string;
  url: string;
};

async function wait(url: string, timeout: number): Promise<void> {
  const start = Date.now();
  let res: Response | undefined;

  while (res?.status !== 200) {
    try {
      res = await fetch(`${url}?query=%7B__typename%7D`, {
        headers: {
          "apollo-require-preflight": "true",
        },
      });

      if (res.status === 200) {
        return;
      }
    } catch (_err) {
      // pass
    }

    if (Date.now() - start >= timeout) {
      throw new Error(`Timeout waiting for ${url}`);
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
  }
}

const servicesConfig: DevConfig = {
  subgraphs: {
    product: {
      port: 4000,
    },
    review: {
      port: 4001,
    },
  },
};

const pendingIcon = chalk.yellow("☇");
const successIcon = chalk.green("✔");
const failureIcon = chalk.red("𐄂");

export const waitForServices = async (timeout: number): Promise<Service[]> => {
  const config = servicesConfig;
  const dgsEntries = Object.entries(config.subgraphs);
  const waitList = new Set(dgsEntries.map(([name, _dgs]) => name));
  const interval = setInterval(() => {
    const serviceList = Array.from(waitList.values()).join(", ");
    log.info(` ${pendingIcon} Still waiting for subgraphs: ${serviceList}`);
  }, 3000);

  return Promise.all(
    dgsEntries.map(async ([name, dgs]) => {
      const urlString = `http://localhost:${dgs.port}/graphql`;
      return wait(urlString, timeout)
        .then(() => {
          log.info(` ${successIcon} ${name}`);
          return {
            name,
            url: urlString,
            local: dgs.local,
          };
        })
        .catch((e) => {
          log.error(
            ` ${failureIcon} Failed to reach ${chalk.yellow(name)} at ${chalk.underline(urlString)}`
          );
          throw e;
        })
        .finally(() => {
          waitList.delete(name);
          if (waitList.size === 0) {
            clearInterval(interval);
          }
        });
    })
  );
};
