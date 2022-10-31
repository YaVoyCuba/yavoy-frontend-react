import {
    OAuth2Client,
    generateCodeVerifier,
    OAuth2Fetch
} from '@badgateway/oauth2-client';

 
const redirectURL = 'http://127.0.0.1:5173';
const CODE_V_STORAGE_KEY = 'oauth_cv';
const TOKEN_STORAGE_KEY = 'oauth_token';

/**
 * @return {OAuth2Client}
 */
const getClient = () => {
    return new OAuth2Client({
        server:'https://apitest.rentalho.com/',
        clientId: 'market_web_app',
        tokenEndpoint: 'oauth/token',
        authorizationEndpoint: 'oauth/authorize'
    });
}

/**
 * Send client browser to authorization endpoint
 * Client credentials flow
 *
 * @return {Promise<void>}
 */
export const authorize = async () => {
    const codeVerifier = await writeCodeVerifier();

    document.location = await getClient().authorizationCode.getAuthorizeUri({
        redirectUri: redirectURL,
        codeVerifier,
        scope: ['SCOPE_PAY'],
        state: '-'
    });
};

/**
 * Get oauth2 token after authorization redirect
 * Client credentials flow
 *
 * @return {Promise<OAuth2Token>}
 */
export const getToken = async () => {
    const codeVerifier = popCodeVerifier();

    const token = await getClient().authorizationCode.getTokenFromCodeRedirect(
        document.location,{
        redirectUri: redirectURL,
        codeVerifier,
        state: '-'
    });
    await writeToken(token);

    return token;
};

/**
 * Refresh oauth token
 *
 * @return {Promise<OAuth2Token>}
 */
export const refreshToken = async () => {
    try {
        const client = await getClient();

        const token = await client.refreshToken(readToken());
        await writeToken(token);

        return token;
    } catch (e) {
        throw e;
    }
}

/**
 * @param {OAuth2Token} token
 * @return {Promise<void>}
 */
export const writeToken = async (token) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
}

/**
 * @return {OAuth2Token}
 */
export const readToken = () => {
    const stringToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    return JSON.parse(stringToken);
}

/**
 * @return {OAuth2Token}
 */
export const popToken = () => {
    const stringToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    return JSON.parse(stringToken);
}

export const writeCodeVerifier = async () => {
    const codeVerifier = await generateCodeVerifier();
    localStorage.setItem(CODE_V_STORAGE_KEY, codeVerifier);

    return codeVerifier;
}

export const popCodeVerifier = () => {
    const cv = localStorage.getItem(CODE_V_STORAGE_KEY);
    localStorage.removeItem(CODE_V_STORAGE_KEY);

    return cv;
}
