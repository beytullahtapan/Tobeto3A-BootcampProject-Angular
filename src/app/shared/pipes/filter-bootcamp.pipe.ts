import { Pipe, PipeTransform } from '@angular/core';
import { GetBootcampsListResponse } from '../../features/models/responses/bootcamp/get-bootcamps-list-response';

@Pipe({
  name: 'filterBootcamp',
  standalone: true
})
export class FilterBootcampPipe implements PipeTransform {
  transform(value: GetBootcampsListResponse[],filterText:string):GetBootcampsListResponse[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((m:GetBootcampsListResponse)=>m.name.toLocaleLowerCase()
    .indexOf(filterText)!==-1):value;
}

}
