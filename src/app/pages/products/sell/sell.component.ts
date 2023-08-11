import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

export interface Sale {
  id: number;
  name: string;
  lab: string;
  createDate: string;
  dueDate: string;
  stock: number;
  value: number;
}

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit{
  
  formData!: FormGroup;

  sale: Sale;
  total: number = 0;

  totalvalue: number = 0
  
  constructor(private fb: FormBuilder,
              private productsService: ProductsService,
              public dialogRef: MatDialogRef<SellComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.sale = data.response;
                this.total = this.sale.stock;

    this.formData = this.fb.group({
      'count': [ 1, [Validators.required, Validators.min(1), Validators.max(this.total)]],
    })
  }


  ngOnInit(): void {
    
  }

  save() {
    this.formData.disable();

    if (this.formData.invalid) {
      this.formData.enable();
      return;
    }

    this.productsService.newSale({medicineId: this.sale.id, quantity: this.formData.value.count, priceUnit: this.sale.value, priceTotal: this.totalvalue}).subscribe((response: any) => {

      Swal.fire({
        icon: 'success',
        title: '¡Ok!',
        text: 'Venta guardada'
      });

      this.formData.reset();
      this.dialogRef.close({ data: response});
      this.formData.enable();
    });

  }

  validateCount() {
    if (this.formData.controls['count'].hasError('max')) {
      Swal.fire({
        icon: 'error',
        title: '¡Upss!',
        text: 'Lo sentimos, no tenemos esa cantidad disponible'
      });
      this.formData.controls['count'].setValue(this.total);
      
    }
    if (this.formData.controls['count'].hasError('min') || this.formData.invalid) {
      Swal.fire({
        icon: 'warning',
        title: ':)',
        text: 'Mínimo debes tener un producto para poder hacer una venta'
      });
      this.formData.controls['count'].setValue(1);
    
    }

    this.totalvalue = this.sale.value * parseInt(this.formData.value.count)
  }
  
}
