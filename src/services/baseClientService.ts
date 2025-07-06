import axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import * as R from 'ramda';

import pkg from '../../package.json';

const paramsSerializer = R.partialRight(stringify, [{ arrayFormat: 'comma' }]);

interface BaseClientServiceInterface {
  baseURL: string;
  nodeEnv: string;
}

export type ExtendedAxiosRequestConfig = AxiosRequestConfig & {
  ignoreError?: boolean;
};

export const BaseClientService = ({ baseURL }: BaseClientServiceInterface) => {
  require('axios-debug-log')({
    response: (
      debug: (arg0: string) => void,
      response: {
        config: { baseURL: any; params: any; method: string; url: any };
        data: any;
      }
    ) => {
      const log = {
        host: response.config.baseURL,
        request: response.config.params,
        response: response.data,
      };

      debug(`[${response.config.method.toUpperCase()}] ${response.config.url}`);

      debug(JSON.stringify(log, null, '  '));
    },
  });

  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers:
      baseURL === process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL
        ? {
            platform: 'web',
            version: pkg.version,
          }
        : {},
    paramsSerializer,
  });

  instance.interceptors.response.use(
    response => response.data,
    error => {
      const config: ExtendedAxiosRequestConfig = error.config;

      const data = R.path(['response', 'data'], error);

      const message = {
        url: `[${R.toUpper(config.method!)}] ${config.url}`,
        status: R.pathOr(R.toLower(String(error.code)), ['response', 'status'], error),
        code: R.propOr('unknown', 'errorCode', data),
        message: R.propOr(error.message, 'message', data),
      };

      console.error(
        `{error on api calling | url: ${message.url} | status: ${message.status} | code: ${message.code} | message: ${message.message}}`
      );

      // should return error for consumer to retry / handle error
      return Promise.reject(message);
    }
  );

  const apis = {
    request: <T>(config: ExtendedAxiosRequestConfig): Promise<T> => {
      return instance.request<T, T>(config);
    },
    get: <T>(url: string, config?: ExtendedAxiosRequestConfig): Promise<T> => {
      return instance.get<T, T>(url, config);
    },
    delete: <T>(url: string, config?: ExtendedAxiosRequestConfig): Promise<T> => {
      return instance.delete<T, T>(url, config);
    },
    head: <T>(url: string, config?: ExtendedAxiosRequestConfig): Promise<T> => {
      return instance.head<T, T>(url, config);
    },
    options: <T>(url: string, config?: ExtendedAxiosRequestConfig): Promise<T> => {
      return instance.options<T, T>(url, config);
    },
    post: <T>(url: string, data?: any, config?: ExtendedAxiosRequestConfig): Promise<T> => {
      return instance.post<T, T>(url, data, config);
    },
    put: <T>(url: string, data?: any, config?: ExtendedAxiosRequestConfig): Promise<T> => {
      return instance.put<T, T>(url, data, config);
    },
    patch: <T>(url: string, config?: ExtendedAxiosRequestConfig): Promise<T> => {
      return instance.patch<T, T>(url, config);
    },
  };

  return { ...instance, ...apis };
};
