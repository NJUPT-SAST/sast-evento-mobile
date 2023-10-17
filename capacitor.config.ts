import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sast.evento.mobile',
  appName: 'sast-evento-mobile',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
