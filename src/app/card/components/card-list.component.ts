import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card-list",
  templateUrl: "card-list.component.html"
})
export class CardListComponent {
  @Input() items: any[] = []; //cardDecks
  @Input() listName: string;

  @Input() navigateTo: any;
}
