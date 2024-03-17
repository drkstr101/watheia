const appUrl = process.env['APP_URL'] || 'https://watheia.vercel.com';
export default {
  apiUrl: process.env['API_URL'] || 'https://watheia.vercel.com/api',
  appUrl,
  snippetUrl: process.env['SNIPPET_URL'] || `${appUrl}/snippet.js`,
  controlUrl: process.env['CONTROL_URL'] || `${appUrl}/control.js`,
  logLevel: process.env['LOG_LEVEL'] || 'info',
};
