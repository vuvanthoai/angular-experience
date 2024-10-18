import { Directive } from '@angular/core';

@Directive({
  selector: '[appHasPermissions]',
  standalone: true,
})
export class HasPermissionsDirective {
  constructor() {}
}
