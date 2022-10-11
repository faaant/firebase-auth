import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpDialogComponent } from './components/pop-up-dialog/pop-up-dialog.component';
import { MaterialModule } from './material.module';

const COMPONENTS = [
  PopUpDialogComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports : [
    ...COMPONENTS
  ]
})
export class SharedModule { }
