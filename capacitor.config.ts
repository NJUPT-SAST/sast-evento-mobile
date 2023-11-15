import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sast.evento.mobile',
  appName: 'SAST-EVENTO',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;
