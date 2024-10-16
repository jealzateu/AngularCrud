import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsRoutingModule } from './cats-routing.module';
import { CatsComponent } from './cats.component';
import { CatListComponent } from './cat-list/cat-list.component';
import { CatEditComponent } from './cat-edit/cat-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CatService } from '../services/cat.service';


@NgModule({
  declarations: [
    CatsComponent,
    CatListComponent,
    CatEditComponent
  ],
  imports: [
    CommonModule,
    CatsRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [CatService]
})
export class CatsModule { }
