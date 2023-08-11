import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  formData!: FormGroup;
  constructor(private fb: FormBuilder,
              private productsService: ProductsService,
              public dialogRef: MatDialogRef<EditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.formData = this.fb.group({
      'id': [ data.response.id, Validators.required],
      'name': [ data.response.name, Validators.required],
      'lab': [ data.response.lab, Validators.required],
      'createDate': [ data.response.createDate, Validators.required],
      'dueDate': [ data.response.dueDate, Validators.required],
      'stock': [ data.response.stock, Validators.required],
      'value': [ data.response.value, Validators.required]
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

    this.productsService.edit(this.formData.value).subscribe((response: any) => {

      Swal.fire({
        icon: 'success',
        title: '¡Ok!',
        text: 'Creado correctamente'
      });

      this.formData.reset();
      this.dialogRef.close({ data: response});
      this.formData.enable();
    });

  }

}
