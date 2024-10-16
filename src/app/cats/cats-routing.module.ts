import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatListComponent } from './cat-list/cat-list.component';
import { CatEditComponent } from './cat-edit/cat-edit.component';
import { CatsComponent } from './cats.component';

const routes: Routes = [
  { path: '', component: CatsComponent, children: [
    { path: '', component: CatListComponent },
    { path: 'edit/:id', component: CatEditComponent },
    { path: 'create', component: CatEditComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsRoutingModule { }
