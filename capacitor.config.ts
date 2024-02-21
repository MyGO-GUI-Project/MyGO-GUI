import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'simu.mygo.gui',
  appName: 'MyGO GUI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
