export interface CardDeck {
  name: string;
  types: string[];
}

export interface Card {
  cardId: string;
  cardSet: string;
  dbfId: string;
  health: number;
  img: string;
  imgGold: string;
  name: string;
  playerClass: string;
  text: string;
  type: string;
  favorite: boolean;
}
