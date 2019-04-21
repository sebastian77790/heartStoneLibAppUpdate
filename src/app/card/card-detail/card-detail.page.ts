import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CardService } from "../shared/card.service";
import { LoaderService } from "../../shared/service/loader.service";
import { ToastService } from "../../shared/service/toast.service";
import { AlertService } from "../../shared/service/alert.service";

import { Card } from "../shared/card.model";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-card-detail",
  templateUrl: "./card-detail.page.html",
  styleUrls: ["./card-detail.page.scss"]
})
export class CardDetailPage {
  cardId: string;
  cardDeckGroup: string;
  cardDeck: string;
  cardImg: string;

  cardDetailed: Card;

  constructor(
    private router: ActivatedRoute,
    private cardService: CardService,
    private navCtrl: NavController,
    private location: Location,
    private loadingService: LoaderService,
    private toaster: ToastService,
    private alertService: AlertService
  ) {}

  async ionViewWillEnter() {
    //this.cardId = this.router.snapshot.paramMap.get("cardId");

    this.cardDeckGroup = this.router.snapshot.paramMap.get("cardDeckGroup");
    this.cardDeck = this.router.snapshot.paramMap.get("cardDeck");
    
    await this.loadingService.presentLoading();

    this.router.paramMap.subscribe((params: ParamMap) => {
      this.cardId = params.get("cardId");
      this.cardImg = params.get("cardImg");
    });

    this.cardService
      .getCardDetail(this.cardId)
      .subscribe((cardDetailed: Card[]) => {
        this.cardDetailed = cardDetailed.map((card: Card) => {
          card.text = card.text ? card.text.replace(new RegExp("\\\\n", "g"), ", ") : "No Description";
          return card;
        })[0];
        this.cardDetailed = cardDetailed[0];
        this.cardDetailed.cardId = this.cardId;
        this.cardDetailed.img = this.cardImg;

        this.loadingService.dismissLoading();
        this.alertService.presentAlert();
      }, 
      () => {
        this.loadingService.dismissLoading(); 
        this.toaster.presentErrorToast("Cards could not be loaded");
    });
      this.location.replaceState('/carddetail');
  }

  navigateBackToCardDeckGroup(){
    this.navCtrl.navigateBack(`/tabs/cardDeck/cardListing/${this.cardDeckGroup}/${this.cardDeck}`);
  }

  updateImage(){
    this.cardDetailed.img = "assets/images/DefaultCard.png";
  }
}
