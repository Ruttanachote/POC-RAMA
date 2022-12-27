import { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
  authenticationScheme?: string;
}

export interface UploadFileParams {
  data?: Recordable;
  name?: string;
  file: File | Blob;
  filename?: string;
  [key: string]: any;
}

export interface RequestOptions {
  joinParamsToUrl?: boolean;
  formatDate?: boolean;
  isShowMessage?: boolean;
  isParseToJson?: boolean;
  successMessageText?: string;
  isShowSuccessMessage?: boolean;
  isShowErrorMessage?: boolean;
  errorMessageText?: string;
  joinPrefix?: boolean;
  apiUrl?: string;
  urlPrefix?: string;
  errorMessageMode?: 'none' | 'modal';
  joinTime?: boolean;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  ignoreCancelToken?: boolean;
  withToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  type?: 'success' | 'error' | 'warning';
  message: string;
  result?: T;
}
