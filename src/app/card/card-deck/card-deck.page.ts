import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { CardService } from "../shared/card.service";
import { LoaderService } from "../../shared/service/loader.service";
import { ToastService } from "../../shared/service/toast.service";

import { CardDeck } from "../shared/card.model";

@Component({
  selector: "app-card-deck",
  templateUrl: "./card-deck.page.html",
  styleUrls: ["./card-deck.page.scss"]
})
export class CardDeckPage {
  private readonly ALLOWED_DECKS = [
    "classes",
    "factions",
    "qualities",
    "types",
    "races"
  ];

  public cardDecks: CardDeck[] = [];

  constructor(
    private cardService: CardService,
    private location: Location,
    private loadingService: LoaderService,
    private toaster: ToastService
  ) /*private route: Router,
    private router: ActivatedRoute,
    private navCtrl: NavController*/
  {
    if (this.cardDecks && this.cardDecks.length === 0) this.getCardDecks();
  }

  private getCardDecks() {
    this.loadingService.presentLoading();
    this.cardService.getAllCardDecks().subscribe((cardDecks: CardDeck[]) => {
      this.extractAllowedDecks(cardDecks);
      /*{this.cardDecks = cardDecks}*/
      this.loadingService.dismissLoading();
    }, 
      () => {
        this.loadingService.dismissLoading(); 
        this.toaster.presentErrorToast("Cards could not be loaded");
    });
  }

  extractAllowedDecks(cardDecks: CardDeck[]) {
    this.ALLOWED_DECKS.forEach((deckName: string) =>
      this.cardDecks.push({ name: deckName, types: cardDecks[deckName] })
    );
  }

  generateUrl(cardDeckGroup: string, cardDeck: string): string {
    return `/tabs/cardDeck/cardListing/${cardDeckGroup}/${cardDeck}`;
  }

  ionViewWillEnter() {
    //this.location.replaceState("/carddeck");
  }

  /*go() {
    this.route.navigate(["/tabs/cardDeck/cardListing"]);
  }

  goActivated() {
    this.route.navigate(["/tabs/cardDeck/cardListing"], { relativeTo: this.router });
  }

  goCtrl(){
    this.navCtrl.navigateForward(`/tabs/cardDeck/cardListing`);
  }*/
}
