import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/cats', pathMatch: 'full' },
  { 
    path: 'cats', 
    loadChildren: () => import('./cats/cats.module').then(m => m.CatsModule) 
  },
  { path: '**', redirectTo: '/cats' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
