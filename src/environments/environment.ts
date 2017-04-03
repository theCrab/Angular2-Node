// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FileUploader } from "ng2-file-upload";

export const environment = {
  production: false,
  serverUrl: 'http://localhost:3000',
  //Alan:未登入時的網址
  nonAuthenticationUrl: '/auth',
  mainPageUrl: '/index/run',
  systemName: 'Machine Ant',
  getRequestOptions(contentType: string = 'application/json'): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': contentType,
        'authorization': localStorage.getItem('token')
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
      authToken: localStorage.getItem('token'),
      additionalParameter: { toUrl: toUrl }
    })
  },
  defaultImageUrl: 'default%5Cdefault.jpg'
};
