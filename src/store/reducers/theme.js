import {
    THEME_CHANGE_TYPE
} from '../actions';

const INIT_STATE = {
    sidebarShow: 'responsive',
    asideShow: false,
    darkMode: false
};

const theme = (state = INIT_STATE, action) => {
    switch (action.type) {
        case THEME_CHANGE_TYPE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default theme;