import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'products'},
  
  {
    path: '',
    canActivate: [],
    canActivateChild: [],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
      { path: 'sales', loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesModule) }
    ]
  },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
