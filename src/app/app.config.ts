import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { App_Route } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth/services/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(App_Route), provideAnimations(),provideHttpClient(),{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]
};
