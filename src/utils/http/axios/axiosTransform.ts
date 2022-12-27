/**
 * 
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from './types';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {

  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  transformRequestData?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  requestCatch?: (e: Error) => Promise<any>;

  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig;

  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  requestInterceptorsCatch?: (error: Error) => void;

  responseInterceptorsCatch?: (error: Error) => void;
}
