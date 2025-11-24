type Dgs = {
  port: number;
};

type DevConfig = {
  subgraphs: Record<string, Dgs>;
};

export const servicesConfig: DevConfig = {
  subgraphs: {
    product: {
      port: 4000,
    },
    review: {
      port: 4001,
    },
    user: {
      port: 4002,
    },
  },
};
