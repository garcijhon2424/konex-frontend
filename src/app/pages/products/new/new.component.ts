import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  
  formData!: FormGroup;
  constructor(private fb: FormBuilder, 
            private productsService: ProductsService,
            public dialogRef: MatDialogRef<NewComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  ngOnInit(): void {

    this.formData = this.fb.group({
      'name': ['', Validators.required],
      'lab': ['', Validators.required],
      'createDate': ['', Validators.required],
      'dueDate': ['', Validators.required],
      'stock': ['', Validators.required],
      'value': ['', Validators.required]
    })
    
  }


  save() {
    this.formData.disable();

    if (this.formData.invalid) {
      this.formData.enable();
      return;
    }

    this.productsService.new(this.formData.value).subscribe((response: any) => {

      Swal.fire({
        icon: 'success',
        title: '¡Ok!',
        text: 'Creado correctamente'
      });
      this.formData.reset();
      this.dialogRef.close({ data: response});
      this.formData.enable();
    })


  }




}
