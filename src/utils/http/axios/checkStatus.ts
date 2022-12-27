export function checkStatus(status: number, msg: string): void {
  const $message = window['$message'];
  switch (status) {
    case 400:
      $message.error(msg);
      break;
    // 401
    case 401:
      $message.error('401!');
      break;
    case 403:
      $message.error('403!');
      break;
    // 404
    case 404:
      $message.error('404!');
      break;
    case 405:
      $message.error('405!');
      break;
    case 408:
      $message.error('408');
      break;
    case 500:
      $message.error('500!');
      break;
    case 501:
      $message.error('501');
      break;
    case 502:
      $message.error('502');
      break;
    case 503:
      $message.error('503!');
      break;
    case 504:
      $message.error('504');
      break;
    case 505:
      $message.error('505!');
      break;
    default:
      $message.error(msg);
  }
}
