/* eslint-disable no-console */
import injectTapEventPlugin from 'react-tap-event-plugin';
import values from 'object.values';

// This is needed by Material UI, and will be removed as a dependency eventually.
console.warn('Shimming React tap event');
injectTapEventPlugin();

if (!Object.values) {
  console.warn('Shimming Object.values');
  values.shim();
}
