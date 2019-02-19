import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SearchComponentModule } from "../../shared/component/search/search.module";
import { CardListingPage } from './card-listing.page';

const routes: Routes = [
  {
    path: '',
    component: CardListingPage
  },
  { path: "cardDetail", loadChildren: "../card-detail/card-detail.module#CardDetailPageModule" }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SearchComponentModule
  ],
  declarations: [CardListingPage]
})
export class CardListingPageModule {}
