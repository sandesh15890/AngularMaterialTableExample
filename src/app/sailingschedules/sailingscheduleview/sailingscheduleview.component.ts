import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Location, ScheduleModel } from '../sailingschedule.model';
import { SailingscheduleService } from '../sailingschedule.service';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sailingscheduleview',
  templateUrl: './sailingscheduleview.component.html',
  styleUrls: ['./sailingscheduleview.component.css'],
})
export class Sailingscheduleview implements OnInit {
  isLoadingResults = false;
  Data: ScheduleModel[] = [];
  scheduleData = new MatTableDataSource<ScheduleModel>(this.Data);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  from: string;
  to: string;
  fromLocation = new FormControl();
  toLocation = new FormControl();
  fromOptions: Location[] = [];
  toOptions: Location[] = [];
  displayedColumns = [
    'id',
    'vessel',
    'voyageNumber',
    'productType',
    'cutOff',
    'cutOffIMO',
    'etd',
    'eta',
  ];

  form: FormGroup = new FormGroup({
    showAdditionalColumns: new FormControl(false),
  });
  showAdditionalColumns = this.form.get('showAdditionalColumns');
  constructor(private _sailingscheduleService: SailingscheduleService) {}

  ngOnInit(): void {
    this.fromLocation.valueChanges
      .subscribe((res) => {
        this.from = res;
        if (res.length > 1) {
          this.fromOptions = [];
          this._sailingscheduleService.getLocations(res).subscribe((res) => {
               this.fromOptions.push(...res);
            });
        }
      });
    this.toLocation.valueChanges.subscribe((res) => {
       this.to = res;
      if (res.length > 1) {
            this.toOptions = [];
           this._sailingscheduleService.getLocations(res).subscribe((res) => {
                this.toOptions.push(...res);
            });
        }
    });
    //this.getSchedules('', '');
  }

  ngAfterViewInit() {
    this.scheduleData.paginator = this.paginator;
    this.scheduleData.sort = this.sort;
    this.showAdditionalColumns.valueChanges.subscribe((res) => {
      if (res) {
        this.displayedColumns.push('carrier');
        this.displayedColumns.push('transitTimePortToPort');
        this.displayedColumns.push('transitTimeCutOffToPort');
        this.displayedColumns.push('comments');
      } else {
        this.displayedColumns.splice(8, 4);
      }
    });
  }
  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }

  getSchedules(from: string, to: string) {
    if ((from == undefined || from == '') || (to ==undefined || to == '')) {
      alert('From and to locations are mandatory');
      return;
    }
    this.isLoadingResults = true;
    var scheduleSubscription = this._sailingscheduleService.getSchailingSchedules(
      from,
      to
    );
    scheduleSubscription.subscribe((res) => {
      this.isLoadingResults = false;
      this.scheduleData.data = res as ScheduleModel[];
    }),
      (err) => {
        this.isLoadingResults = false;
        this.scheduleData.data = [];
      };
  }

  sortData(sort: Sort) {
    const data = this.scheduleData.data.slice();
    if (!sort.active || sort.direction === '') {
      this.scheduleData.data = data;
      return;
    }
    this.scheduleData.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'voyageNumber':
          return this.compare(a.voyageNumber, b.voyageNumber, isAsc);
        case 'cutOff':
          return this.compare(a.cutOff, b.cutOff, isAsc);
         case 'etd':
          return this.compare(a.etd, b.etd, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
