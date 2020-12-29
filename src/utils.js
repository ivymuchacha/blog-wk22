const TOKEN_NAME = "token";

export const setAuthToken = (token) => localStorage.setItem(TOKEN_NAME, token);

export const getAuthToken = () => localStorage.getItem(TOKEN_NAME);

export const MEDIA_QUERY = "@media screen and (max-width: 768px)";
