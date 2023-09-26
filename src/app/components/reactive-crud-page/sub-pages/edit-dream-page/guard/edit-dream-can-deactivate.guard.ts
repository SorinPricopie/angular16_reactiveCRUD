import { CanDeactivateFn } from '@angular/router';
import { DreamsService } from '../../../services/dreams-service/dreams.service';
import { inject } from '@angular/core';

export const editDreamCanDeactivateGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const ds = inject(DreamsService);
  return ds.isDreamEdited;
};
