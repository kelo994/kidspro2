
import { NgModule } from '@angular/core';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule,MatDialogModule, MatBottomSheetModule, MatButtonModule, MatSlideToggleModule, MatTableModule, MatIconModule, MatExpansionModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [ DragDropModule, MatListModule, MatTooltipModule, MatBottomSheetModule, MatButtonModule, MatSlideToggleModule, MatTableModule, MatIconModule, MatExpansionModule, MatCheckboxModule],
  exports: [ DragDropModule, CdkStepperModule, CdkTableModule, CdkTreeModule, DragDropModule, MatDialogModule, MatListModule, MatTooltipModule, MatBottomSheetModule, MatButtonModule, MatSlideToggleModule, MatTableModule, MatIconModule, MatExpansionModule, MatCheckboxModule],
})
export class MaterialModule { }
