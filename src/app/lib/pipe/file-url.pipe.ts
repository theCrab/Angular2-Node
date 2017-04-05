import { environment } from './../../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileURL'
})
export class FileUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return environment.serverUrl + "/file/" + value;
    }
    return environment.serverUrl + "/file/" + environment.defaultImageUrl;
  }

}