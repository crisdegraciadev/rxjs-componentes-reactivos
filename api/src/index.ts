import app from './app';
import { CONFIG } from './config';

app.listen(CONFIG.PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening: ${CONFIG.API_URL}`);
  /* eslint-enable no-console */
});
