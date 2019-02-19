import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { CardService } from "../shared/card.service";
import { LoaderService } from "../../shared/service/loader.service";
import { ToastService } from "../../shared/service/toast.service";

import { Card } from "../shared/card.model";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-card-listing",
  templateUrl: "./card-listing.page.html",
  styleUrls: ["./card-listing.page.scss"]
})
export class CardListingPage {
  cardDeckGroup: string;
  cardDeck: string;

  cards: Card[] = [];
  copyOfCards: Card[] = [];

  constructor(
    private router: ActivatedRoute,
    private cardService: CardService,
    private navCtrl: NavController,
    private location: Location,
    private loadingService: LoaderService,
    private toaster: ToastService
  ) {}

  private getCards() {
    this.loadingService.presentLoading();

    this.cardService
      .getCardsByDeck(this.cardDeckGroup, this.cardDeck)
      .subscribe(
        (cards: Card[]) => {
          //this.cards = cards;
          this.cards = cards.map((card: Card) => {
            card.text = this.cardService.replaceCardText(card.text);
            return card;
          });

          this.copyOfCards = Array.from(this.cards);
          this.loadingService.dismissLoading();
        },
        () => {
          this.loadingService.dismissLoading();
          this.toaster.presentErrorToast("Cards could not be loaded");
        }
      );
  }

  ionViewWillEnter() {
    this.cardDeckGroup = this.router.snapshot.paramMap.get("cardDeckGroup");
    this.cardDeck = this.router.snapshot.paramMap.get("cardDeck");

    if (this.cards && this.cards.length === 0) this.getCards();

    //this.location.replaceState("/cardlist");
  }

  doRefresh(event){
    this.getCards();
    event.target.complete();
  }

  hydrateCards(cards: Card[]){
    this.cards = cards;
  }

  navigateToDetail(
    cardDeckGroup: string,
    cardDeck: string,
    cardId: string,
    cardImg: string
  ) {
    //return `/tabs/cardDeck/cardListing/cardDetail/${cardId}`;
    this.navCtrl.navigateForward([
      `/tabs/cardDeck/cardListing/${cardDeckGroup}/${cardDeck}/cardDetail`,
      { cardId: cardId, cardImg: cardImg }
    ]);
  }
}
