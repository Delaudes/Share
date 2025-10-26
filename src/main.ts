import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/infrastructure/app.config';
import { App } from './app/presentation/components/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
