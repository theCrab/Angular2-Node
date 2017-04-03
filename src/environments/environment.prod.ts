
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FileUploader } from "ng2-file-upload";

export const environment = {
  production: false,
  serverUrl: '',
  //Alan:未登入時的網址
  nonAuthenticationUrl: '/auth/signin',
  mainPageUrl: '/index/run',
  systemName: 'Machine Ant',
  getRequestOptions(contentType: string = 'application/json'): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': contentType,
        'authorization': sessionStorage.getItem('token')
      })
    });
  },
  // http://valor-software.com/ng2-file-upload/
  getUploadConfig(toUrl, apiUrl = "/file/upload"): FileUploader {
    return new FileUploader({
      url: apiUrl,
      method: "POST",
      //Alan: uploaded file release memory
      removeAfterUpload: true,
      //Alan:the file alias to avoid other non-security upload
      itemAlias: "MMSUploadFile",
      authToken: sessionStorage.getItem('token'),
      additionalParameter: { toUrl: toUrl }
    })
  },
  defaultImageUrl: 'default%5Cdefault.jpg'
};
