import {NgModule} from '@angular/core';
import {TruncatePipe} from "./pipes/truncate.pipe";

@NgModule({
  declarations: [
    TruncatePipe
  ],
  imports: [],
  exports: [
    TruncatePipe
  ],
})
export class SharedModule {
}
