import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule} from '@angular/material/input'
import { MatCardModule} from '@angular/material/card'
import { MatIconModule} from '@angular/material/icon'
import { MatButtonModule} from '@angular/material/button'

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports : [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class MaterialModule { }
