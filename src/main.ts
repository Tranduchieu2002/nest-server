import { AppInitialization } from './app-initialization';
import './q-builder.polyfill';

(function initialize() {
  const app = new AppInitialization();
  app.bootstrap();
})();
