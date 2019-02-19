import { Injectable } from "@angular/core";
import { of as ObservableOf, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { CardDeck, Card } from "./card.model";

@Injectable({
  providedIn: "root"
})
export class CardService {
  private readonly HS_API_URL = "https://omgvamp-hearthstone-v1.p.mashape.com";
  private readonly API_KEY =
    "tVHI1IjzTRmshHepWWeS0kSnevlWp1Yppfsjsnq9AO0BLpf0pG";

  private headers: HttpHeaders;

  //private readonly cardDecks: string[] = ["Druid", "Mage", "Warrior", "Rogue", "Shaman", "Priest", "Warlock", "Hunter", "Paladin"];

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ "X-Mashape-Key": this.API_KEY });
  }

  public replaceCardText(text: string){
    return text ? text.replace(new RegExp("\\\\n", "g"), ", ") : "No Description";
  }

  public getAllCardDecks(): Observable<CardDeck[]> {
  //const headers = new HttpHeaders({ "X-Mashape-Key": this.API_KEY });

    return this.http.get<CardDeck[]>(`${this.HS_API_URL}/info`, { headers: this.headers });
    //return ObservableOf(this.cardDecks);
  }

  public getCardsByDeck(cardDeckGroup: string, cardDeck: string): Observable<Card[]>{
      return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardDeckGroup}/${cardDeck}`, { headers: this.headers });
  }

  public getCardDetail(cardId: string): Observable<Card[]>{
    return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardId}`, { headers: this.headers });
  }

}
