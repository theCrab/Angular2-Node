import { environment } from './../../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileURL'
})
export class FileUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //if it has value, string or blob(other)
    if (value) {      
      switch (typeof (value)) {
        case "string":
          return environment.serverUrl + "/file/" + value;
        default:
          return value;
      }
    }
    return environment.serverUrl + "/file/" + environment.defaultImageUrl;
  }

}