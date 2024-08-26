export const config = {
  db: {
    // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
  },
  graphql: {
    debug: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    autoSchemaFile: true,
    autoTransformHttpErrors: true,
    // cors: { credentials: true },
    // sortSchema: true,
    // installSubscriptionHandlers: true,
  },
  hello: 'world',
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC) || '7d',
  refreshExpiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC) || '7d',
  CLD_CLOUD_NAME: process.env.CLD_CLOUD_NAME,
  CLD_API_KEY: process.env.CLD_API_KEY,
  CLD_API_SECRET: process.env.CLD_API_SECRET,
};
