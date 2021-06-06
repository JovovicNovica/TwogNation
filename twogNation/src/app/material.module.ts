import {NgModule} from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [MatInputModule, MatDialogModule, MatButtonModule, MatSnackBarModule],
  exports: [MatInputModule, MatDialogModule, MatButtonModule, MatSnackBarModule],
})
export class MaterialModule {
}
