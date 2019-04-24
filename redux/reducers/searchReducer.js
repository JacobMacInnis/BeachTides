import moment from 'moment';
import { SET_DATE } from '../actions/searchActions';

const initialState = {
  location: 'Zip or City, State',
  date: `${moment().format('MM DD YYYY')}`
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_DATE) {
		return Object.assign({}, state, {
			date: action.date
		});
	} else {
    return state;
	}
};
