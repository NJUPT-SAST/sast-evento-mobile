import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sast.evento.mobile',
  appName: 'Sast-Evento-Mobile',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;
