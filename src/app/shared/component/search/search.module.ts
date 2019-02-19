import { NgModule } from "@angular/core";
import { SearchComponent } from "../../component/search/search.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [SearchComponent],
  imports: [IonicModule, CommonModule],
  exports: [SearchComponent]
})
export class SearchComponentModule {}
