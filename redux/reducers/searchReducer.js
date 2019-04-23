import moment from 'moment';
import { SET_DATE } from '../actions/searchActions';

const initialState = {
  date: `${moment().format('MM DD YYYY')}`
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_DATE) {
		return Object.assign({}, state, {
			date: action.date
		});
  } else if (action.type === LEAVE_ENTRY_SCREEN) {
    return Object.assign({}, state, {
			type: null,
			openEntryScreen: false
    });
	} else {
    return state;
	}
};
