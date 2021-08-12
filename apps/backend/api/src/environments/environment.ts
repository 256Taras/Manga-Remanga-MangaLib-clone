export const environment = {
  production: false,
  databaseConnection: {
    type: process.env['DB_TYPE'] as 'aurora-data-api',
    url: process.env['DATABASE_URL'],
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    dropSchema: false
  },
  jwt: {
    accessTokenSecrete: process.env['JWT_ACCESS_TOKEN_SECRET'],
    expiresInAccessToken: Number(process.env['JWT_ACCESS_TOKEN_EXPIRATION_TIME']),
    refreshTokenSecret: process.env['JWT_REFRESH_TOKEN_SECRET'],
    expiresInRefreshToken:Number(process.env['JWT_REFRESH_TOKEN_SECRET']),
  }
};
