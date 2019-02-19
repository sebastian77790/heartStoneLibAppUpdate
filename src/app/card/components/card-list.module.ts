import { NgModule } from "@angular/core";
import { CardListComponent } from "./card-list.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [CardListComponent],
  imports: [IonicModule, CommonModule],
  exports: [CardListComponent]
})
export class CardListComponentModule {}
