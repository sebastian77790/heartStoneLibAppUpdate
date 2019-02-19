import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";
//import { CardDeckPage } from "../card/card-deck.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      /*{
        path: "card",
        children: [
          { path: "", loadChildren: "../card/card.module#CardPageModule" }
        ]
      },*/
      {
        path: "cardDeck",
        children: [
          {
            path: "",
            loadChildren:
              "../card/card-deck/card-deck.module#CardDeckPageModule"
          }
        ]
      },
      {
        path: "tab3",
        children: [
          { path: "", loadChildren: "../tab3/tab3.module#Tab3PageModule" }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/cardDeck",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/cardDeck",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
