import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { DreamsService } from '../../../services/dreams-service/dreams.service';

export const addDreamCanDeactivateGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const ds = inject(DreamsService);
  return ds.isDreamAdded;
};
