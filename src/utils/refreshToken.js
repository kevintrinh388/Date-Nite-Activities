import log from 'loglevel';

const DEFAULT_EXPIRY_TIME = 3600 - 5 * 60;
const SECONDS_TO_MILLIS = 1000;

const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || DEFAULT_EXPIRY_TIME) * SECONDS_TO_MILLIS;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || DEFAULT_EXPIRY_TIME) * SECONDS_TO_MILLIS;
    log.info('newAuthRes:', newAuthRes);
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem('authToken', newAuthRes.id_token);

    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};

export default refreshTokenSetup;
