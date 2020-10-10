import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sailingscheduleview } from './sailingscheduleview/sailingscheduleview.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SailingscheduleService } from './sailingschedule.service';
import { DaysFromNow } from '../sailingschedules/customDate.pipe';

@NgModule({
  declarations: [Sailingscheduleview, DaysFromNow],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
  ],
  exports: [Sailingscheduleview],
  providers: [SailingscheduleService],
})
export class SailingschedulesModule {}
