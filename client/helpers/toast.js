/** @format */

import { DeviceEventEmitter } from 'react-native';

const SHOW_TOAST_MESSAGE = 'SHOW_TOAST_MESSAGE';

const toast = {
  info: (options) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: 'info' });
  },
  danger: (options) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {
      ...options,
      type: 'An error has occured',
    });
  },
  success: (options) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {
      ...options,
      type: 'success',
    });
  },
};
export default toast;
