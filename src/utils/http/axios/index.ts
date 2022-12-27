// axios
import { VAxios } from './Axios';
import { AxiosTransform } from './axiosTransform';
import axios, { AxiosResponse } from 'axios';
import { checkStatus } from './checkStatus';
import { joinTimestamp, formatRequestDate } from './helper';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { PageEnum } from '@/enums/pageEnum';

import { useGlobSetting } from '@/hooks/setting';

import { isString } from '@/utils/is/';
import { deepMerge, isUrl } from '@/utils';
import { setObjToUrlParams } from '@/utils/urlUtils';

import { RequestOptions, Result, CreateAxiosOptions } from './types';

import { useUserStoreWidthOut } from '@/store/modules/user';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix || '';

import router from '@/router';
import { storage } from '@/utils/Storage';

const transform: AxiosTransform = {
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const {
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse,
    } = options;
    if (isReturnNativeResponse) {
      return res;
    }
    if (!isTransformResponse) {
      return res.data;
    }

    const { data } = res;

    const $dialog = window['$dialog'];
    const $message = window['$message'];

    if (!data) {
      throw new Error('Request error, please try again later');
    }
    const { code, result, message } = data;
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        $dialog.success({
          type: 'success',
          content: successMessageText || message || '操作成功！',
        });
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        $message.error(message || errorMessageText || '操作失败！');
      } else if (!hasSuccess && options.errorMessageMode === 'modal') {
        $dialog.info({
          title: '提示',
          content: message,
          positiveText: '确定',
          onPositiveClick: () => {},
        });
      }
    }

    if (code === ResultEnum.SUCCESS) {
      return result;
    }
    let errorMsg = message;
    switch (code) {
      case ResultEnum.ERROR:
        $message.error(errorMsg);
        break;
      case ResultEnum.TIMEOUT:
        const LoginName = PageEnum.BASE_LOGIN_NAME;
        const LoginPath = PageEnum.BASE_LOGIN;
        if (router.currentRoute.value?.name === LoginName) return;
        errorMsg = '登录超时，请重新登录!';
        $dialog.warning({
          title: '提示',
          content: '登录身份已失效，请重新登录!',
          positiveText: '确定',
          //negativeText: '取消',
          closable: false,
          maskClosable: false,
          onPositiveClick: () => {
            storage.clear();
            window.location.href = LoginPath;
          },
          onNegativeClick: () => {},
        });
        break;
    }
    throw new Error(errorMsg);
  },

  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    const isUrlStr = isUrl(config.url as string);

    if (!isUrlStr && joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (!isUrlStr && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  requestInterceptors: (config, options) => {
    const userStore = useUserStoreWidthOut();
    const token = userStore.getToken;
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  responseInterceptorsCatch: (error: any) => {
    const $dialog = window['$dialog'];
    const $message = window['$message'];
    const { response, code, message } = error || {};
    const msg: string =
      response && response.data && response.data.message ? response.data.message : '';
    const err: string = error.toString();
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        $message.error('request timed out!');
        return;
      }
      if (err && err.includes('Network Error')) {
        $dialog.info({
          title: 'network error',
          content: 'Please check if your network connection is normal',
          positiveText: 'sure',
          //negativeText: '..',
          closable: false,
          maskClosable: false,
          onPositiveClick: () => {},
          onNegativeClick: () => {},
        });
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as any);
    }
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg);
    } else {
      console.warn(error, '请求被取消！');
    }
    return Promise.reject(response?.data);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        authenticationScheme: '',
        prefixUrl: urlPrefix,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        transform,
        requestOptions: {
          joinPrefix: true,
          isReturnNativeResponse: false,
          isTransformResponse: true,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: 'none',
          apiUrl: globSetting.apiUrl,
          urlPrefix: urlPrefix,
          joinTime: true,
          ignoreCancelToken: true,
          withToken: true,
        },
        withCredentials: false,
      },
      opt || {}
    )
  );
}

export const http = createAxios();

// import { httpTwo } from '@/utils/http/axios'
// export const httpTwo = createAxios({
//   requestOptions: {
//     apiUrl: 'http://localhost:9001',
//     urlPrefix: 'api',
//   },
// });
