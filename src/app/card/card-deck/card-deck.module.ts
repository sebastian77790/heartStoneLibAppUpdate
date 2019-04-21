import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { CardDeckPage } from "./card-deck.page";
import { CardListComponentModule } from "../components/card-list.module";
//import { CardListingPage } from "../card-listing/card-listing.page";

import { LoaderService } from "../../shared/service/loader.service";
import { ToastService } from "../../shared/service/toast.service";
import { AlertService } from "../../shared/service/alert.service";
import { FavoriteCardStore } from '../shared/card-favorite.store';

const routes: Routes = [
  {
    path: "",
    component: CardDeckPage
    /*children: [
      {
        path: "cardListing",
        loadChildren:
          "../card-listing/card-listing.module#CardListingPageModule"
      }
    ]*/
  },
  { path: "cardListing/:cardDeckGroup/:cardDeck", loadChildren: "../card-listing/card-listing.module#CardListingPageModule" }
  //{ path: "cardListing/:cardDeckGroup/:cardDeck", component: CardListingPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CardListComponentModule 
  ],
  providers: [
    LoaderService,
    ToastService,
    AlertService,
    FavoriteCardStore
  ],
  declarations: [CardDeckPage],
  //declarations: [CardDeckPage, CardListingPage],
  exports: [RouterModule]
})
export class CardDeckPageModule {}
