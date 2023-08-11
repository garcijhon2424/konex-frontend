import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { Route, RouterModule } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SellComponent } from './sell/sell.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

const routes: Route[] = [
  {
      path     : '',
      component: ProductsComponent
  }
];

@NgModule({
  declarations: [
    ProductsComponent,
    NewComponent,
    EditComponent,
    SellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class ProductsModule { }
