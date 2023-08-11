import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SellComponent } from './sell/sell.component';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator} from '@angular/material/paginator'


export interface Product {
  id: number;
  name: string;
  lab: string;
  createDate: string;
  dueDate: string;
  stock: number;
  value: number;
}



let  ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'lab', 'createDate', 'dueDate', 'stock', 'value', 'options'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // Paginacion
  items = 0;
  page_size: number = 10;
  page_number: number = 0;

  constructor(public dialog: MatDialog, private productsService: ProductsService, private _changeDetectorRef: ChangeDetectorRef) {

  }


  ngOnInit(): void {
    this.getProducts(0, 20);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modalNew() {

    const dialogRef = this.dialog.open(NewComponent, {
      data: { response: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      ELEMENT_DATA.push(result.data);
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });

  }
  modalEdit(data: Product) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { response: data },
    });

    dialogRef.afterClosed().subscribe(result => {
      
      ELEMENT_DATA = ELEMENT_DATA.map(item => {
        if (item.id === result.data.id) {
          return result.data;
        } else {
          return item;
        }
      })

      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }
  modalSell(data: Product) {
    const dialogRef = this.dialog.open(SellComponent, {
      data: { response: data },
    });

    dialogRef.afterClosed().subscribe(result => {

      ELEMENT_DATA = ELEMENT_DATA.map(item => {
        if (item.id === result.data?.medicine.id) {
          return {...item, stock: item.stock - result.data.quantity};
        } else {
          return item;
        }
      })

      this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    });
  }

  delete(data: Product) {
    Swal.fire({
      title: '¿Quieres eliminar este registro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productsService.delete(data.id).subscribe((response: any) => {
          ELEMENT_DATA = ELEMENT_DATA.filter(item =>  item.id != response.id);
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          Swal.fire('Producto eliminado', '', 'success')
        })
      } else if (result.isDenied) {
        Swal.fire('Conservaremos este producto', '', 'info')
      }
    })
  }


  getProducts(init: number, fin: number){
    this.productsService.getProducts(init, fin).subscribe((response: any) => {

      ELEMENT_DATA = response.list;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }


  paginateEvent(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

}
