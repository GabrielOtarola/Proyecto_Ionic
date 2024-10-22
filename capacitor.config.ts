import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
<<<<<<< HEAD
  appId: 'com.example.app',
  appName: 'MyApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'YOUR_SERVER_CLIENT_ID.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
=======
  appId: 'io.ionic.starter',
  appName: 'vida_saludable',
  webDir: 'www'
>>>>>>> parent of 2cba86f (Merge branch 'main' into Sebastian)
};

export default config;
