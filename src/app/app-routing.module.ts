import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'users', loadChildren: () => import('./pages/users-page/user-page.module').then(m => m.UserPageModule)},
  {path: 'settings/:id', loadChildren: () => import('./pages/settings-page/settings-page.module').then(m => m.SettingsPageModule)},
  {path: 'settings/:id/view', loadChildren: () => import('./pages/settings-page/settings-page.module').then(m => m.SettingsPageModule)},
  {path: 'settings/new', loadChildren: () => import('./pages/settings-page/settings-page.module').then(m => m.SettingsPageModule)},
  {path: '**', redirectTo: 'users', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
