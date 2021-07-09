import {
    THEME_CHANGE_TYPE
} from '../actions';

export const themeChangeSettings = settings => ({
    type: THEME_CHANGE_TYPE,
    payload: settings
});