import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { SplashScreen } from '@capacitor/splash-screen';
import { CookiesProvider } from 'react-cookie';
import {
  AuthProvider,
  IsTaskDraggingProvider,
  SearchProvider,
} from './context';

window.screen.orientation.lock('portrait');

const splashScreen = async () => {
  // Show the splash for two seconds and then automatically hide it:
  await SplashScreen.show({
    showDuration: 2000,
    autoHide: true,
  });
};

splashScreen();

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CookiesProvider>
          <SearchProvider>
            <IsTaskDraggingProvider>
              <App />
            </IsTaskDraggingProvider>
          </SearchProvider>
        </CookiesProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();
