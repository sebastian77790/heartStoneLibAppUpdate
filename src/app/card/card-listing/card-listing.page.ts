import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { CardService } from "../shared/card.service";
import { LoaderService } from "../../shared/service/loader.service";
import { ToastService } from "../../shared/service/toast.service";
import { Storage } from "@ionic/storage";
import { FavoriteCardStore } from '../shared/card-favorite.store';

import { Card } from "../shared/card.model";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";

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

  isLoading: boolean = false;

  favoriteCards: any = {};
  favoriteCardSub: Subscription;

  constructor(
    private router: ActivatedRoute,
    private cardService: CardService,
    private navCtrl: NavController,
    private location: Location,
    private loadingService: LoaderService,
    private toaster: ToastService,
    private storage: Storage,
    private favoriteCardStore: FavoriteCardStore
  ) {

    this.favoriteCardSub = this.favoriteCardStore.favoriteCards.subscribe((favoriteCards: any) => {
      this.favoriteCards = favoriteCards || {};
    })

    /*this.storage.get('favoriteCards').then((favoriteCards) => {
      this.favoriteCards = favoriteCards || {};
    })*/
  }

  private async getCards() {
    await this.loadingService.presentLoading();

    this.cardService
      .getCardsByDeck(this.cardDeckGroup, this.cardDeck)
      .subscribe(
        (cards: Card[]) => {
          //this.cards = cards;
          this.cards = cards.map((card: Card) => {
            card.text = this.cardService.replaceCardText(card.text);
            card.favorite = this.isCardFavorite(card.cardId);
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

  private isCardFavorite(cardId: string):boolean{
    const card = this.favoriteCards[cardId];

    return card ? true : false;
  }

  ionViewDidLeave(){
    if (this.favoriteCardSub && !this.favoriteCardSub.closed){
      this.favoriteCardSub.unsubscribe();
    }
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
    this.isLoading = false;
  }

  handleSearch(){
    this.isLoading = true;
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

  favoriteCard(card: Card){
    this.favoriteCardStore.toggleCard(card);
  }

  /*favoriteCard(card: Card){
    if(card.favorite){
      card.favorite = false;
      delete this.favoriteCards[card.cardId];
    } else{
      card.favorite = true;
      this.favoriteCards[card.cardId] = card;
    }

    this.storage.set('favoriteCards', this.favoriteCards).then(() => {});
  }*/

}
