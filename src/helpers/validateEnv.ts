export const validateEnv = () => {
    const requiredEnvs = [
      'ACCESS_TOKEN_SECRET',
      'ACCESS_TOKEN_EXPIRES_IN',
      'REFRESH_TOKEN_SECRET',
      'REFRESH_TOKEN_EXPIRES_IN',
    ];
  
    requiredEnvs.forEach((key) => {
      if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
      }
    });
  };
  