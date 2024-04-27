import { FormGroup } from '@angular/forms';
import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface HasUnsavedChanges {
  hasUnsavedChanges: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const formConfirmExitGuard: CanDeactivateFn<HasUnsavedChanges> = (component, currentRoute, currentState, nextState) => {

  if(component.hasUnsavedChanges()){
    return confirm("You have unsaved changes. Do you really want to discard these changes?");
  }

  return true;
};
