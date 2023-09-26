import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { reactiveCrudCanActivateGuard } from './components/reactive-crud-page/guard/reactive-crud-can-activate.guard';
import { editDreamCanDeactivateGuard } from './components/reactive-crud-page/sub-pages/edit-dream-page/guard/edit-dream-can-deactivate.guard';
import { addDreamCanDeactivateGuard } from './components/reactive-crud-page/sub-pages/add-dream-page/guard/add-dream-can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: HomePageComponent },
  {
    path: 'reactive-crud',
    loadComponent: () =>
      import('./components/reactive-crud-page/reactive-crud.component').then(
        (c) => c.ReactiveCrudComponent
      ),
    canActivate: [reactiveCrudCanActivateGuard],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./components/auth-page/auth-page.component').then(
        (c) => c.AuthPageComponent
      ),
  },
  {
    path: 'edit-dream/:id',
    loadComponent: () =>
      import(
        './components/reactive-crud-page/sub-pages/edit-dream-page/edit-dream.component'
      ).then((c) => c.EditDreamComponent),
    canActivate: [reactiveCrudCanActivateGuard],
    canDeactivate: [editDreamCanDeactivateGuard],
  },
  {
    path: 'add-dream/:id',
    loadComponent: () =>
      import(
        './components/reactive-crud-page/sub-pages/add-dream-page/add-dream.component'
      ).then((c) => c.AddDreamComponent),
    canActivate: [reactiveCrudCanActivateGuard],
    canDeactivate: [addDreamCanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
