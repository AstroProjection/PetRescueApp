import { DEVICE_IDENTIFIED } from '../types';

const initialState = {
  isMobile: false,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case DEVICE_IDENTIFIED:
      return {
        ...state,
        isMobile: payload,
      };

    default:
      return {
        ...state,
      };
  }
}
