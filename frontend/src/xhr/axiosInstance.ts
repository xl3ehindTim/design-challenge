import axios from "axios";
import {
  applyAuthTokenInterceptor,
  IAuthTokens,
  TokenRefreshRequest,
} from "axios-jwt";
import { API_URL } from "./xhr.constants";

const axiosInstance = axios.create({ baseURL: API_URL });

// eslint-disable-next-line consistent-return
const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string
): Promise<IAuthTokens | string> => {
  const response = await axios.post(`${API_URL}/api/token/refresh/`, {
    refresh: refreshToken,
  });

  return {
    accessToken: response.data.access,
    refreshToken: response.data.refresh,
  };
};

// 3. Apply interceptor
applyAuthTokenInterceptor(axiosInstance, { requestRefresh });

export default axiosInstance;