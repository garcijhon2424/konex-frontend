import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from '@angular/common';

export interface Sale {
  id: number;
  createDate: string;
  medicine: any;
  priceUnit: number;
  priceTotal: number;
  quantity: number;
}



let  ELEMENT_DATA: Sale[] = [];

const MY_DATE_FORMAT = {
  parse: {
      dateInput: "DD/MM/YYYY", // this is how your date will be parsed from Input
  },
  display: {
      dateInput: "DD/MM/YYYY", // this is how your date will get displayed on the Input
      monthYearLabel: "MMMM YYYY",
      dateA11yLabel: "LL",
      monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  providers: [
    {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
],
})
export class SalesComponent implements OnInit {


  displayedColumns: string[] = ['id', 'createDate', 'medicine', 'priceUnit', 'quantity', 'priceTotal'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  date = "";
  start: any;
  end: any;

  range = new FormGroup({
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(new Date()),
  });

  constructor(private salesService: SalesService, public datepipe: DatePipe,) {

  }


  ngOnInit(): void {

    this.changeDate();
  }




  getSales(inicio: string, fin: string) {
    this.salesService.getSales(inicio, fin).subscribe((response: any) => {

      ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    })
  }


  changeDate() {
    if (!this.range.value.start && !this.range.value.end) {
        return;
    }
    if (this.range.value.start && this.range.value.end) {
        this.start = this.datepipe.transform(
            this.range.value.start,
            "yyyy-MM-dd"
        );
        this.end = this.datepipe.transform(this.range.value.end, "yyyy-MM-dd");
    }

    if (this.range.value.start && !this.range.value.end) {
        this.start = this.datepipe.transform(
            this.range.value.start,
            "yyyy-MM-dd"
        );
        this.end = this.datepipe.transform(this.range.value.start, "yyyy-MM-dd");
    }

    if (!this.range.value.start && this.range.value.end) {
        this.start = this.datepipe.transform(this.range.value.end, "yyyy-MM-dd");
        this.end = this.datepipe.transform(this.range.value.end, "yyyy-MM-dd");
    }

    this.getSales(this.start, this. end);


}





}
