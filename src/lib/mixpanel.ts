import mixpanel from 'mixpanel-browser';
mixpanel.init('MIXPANEL_TOKEN', {
  debug: true,  // Enable debug mode for development
  ignore_dnt:true, // Ignore Do Not Track settings
});

export const Mixpanel = mixpanel;
export enum MixpanelEvents {
   'Login' = 'Login',
  'Page View' = 'Page View',
  'Interact' = 'Interact',
  'API Response' = 'API Response',
}
