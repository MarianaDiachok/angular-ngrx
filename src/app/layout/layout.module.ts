import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  LoginComponent,
  PathNotFoundComponent
} from './components';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    PathNotFoundComponent,
    LoginComponent
  ]
})
export class LayoutModule {}
