import {FETCH_USER} from "../actions/types";

export default function (state = null, action) {
  const {type, payload} = action;

  switch (type) {
    case FETCH_USER:
      return payload || false;
    default:
      return state;
  }
}
