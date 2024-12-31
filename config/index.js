const { configDotenv } = require('dotenv');

configDotenv();
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
  sequelizeConfig: {
    development: {
      url: process.env.SEQ_URI_DEV,
      dialect: 'postgres',
      logging: (sql) => console.log(sql + '\n\n'),
    },
    production: {
      url: process.env.SEQ_URI_PROD,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Configuración específica para evitar errores de certificado en desarrollo
        },
      },
    },
    test: {
      url: process.env.SEQ_URI_TEST,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Configuración específica para evitar errores de certificado en desarrollo
        },
      },
    },
  },
};
