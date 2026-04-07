type WsResponseSuccess<T> = {
  success: true;
  data: T;
  error?: undefined;
};

type WsResponseError = {
  success: false;
  data?: undefined;
  error: unknown;
};

export type WsResponseType<T> = WsResponseSuccess<T> | WsResponseError;
