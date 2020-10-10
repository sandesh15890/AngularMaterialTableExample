import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Location, ScheduleModel } from '../sailingschedule.model';
import { SailingscheduleService } from '../sailingschedule.service';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

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
        if (res.length > 1) {
          this.fromOptions = [];
          this._sailingscheduleService.getLocations(res).subscribe((res) => {
               this.fromOptions.push(...res);
            });
        }
      });
    this.toLocation.valueChanges.subscribe((res) => {
      if (res.length > 1) {
            this.toOptions = [];
           this._sailingscheduleService.getLocations(res).subscribe((res) => {
                this.toOptions.push(...res);
            });
        }
    });
    this.getSchedules('be', 'sgsin');
  }

  selected($event : any) {
    console.log($event); 
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
    this.isLoadingResults = true;
    var scheduleSubscription = this._sailingscheduleService.getSchailingSchedules(
      from,
      to
    );
    scheduleSubscription.subscribe((res) => {
      this.isLoadingResults = false;
      this.scheduleData.data = res as ScheduleModel[];
      console.log(this.scheduleData.data.length);
    }),
      (err) => {
        this.isLoadingResults = false;
        console.log('error occured while fetching details', err);
        this.scheduleData.data = [];
      };
  }

  // private _filter(value: string): Location[] {
  //   const filterValue = value.toLowerCase();
  //   return this.locationData.filter(
  //     (option) => option.name.toLowerCase().indexOf(filterValue) === 0
  //   );
  // }

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
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
