export const environment = {
  production: false,
  databaseConnection: {
    type: process.env.DB_TYPE as 'aurora-data-api',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    dropSchema: false,
  },
};
