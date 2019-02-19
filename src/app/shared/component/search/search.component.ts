import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html"
})
export class SearchComponent {
  @Input() items: any[] = [];

  @Output() searchCompleted = new EventEmitter();

  handleSearch(event: any) {

    const searchedText = event.target.value;

    if(!this.items) return this.searchCompleted.emit([]);
    if(!searchedText) return this.searchCompleted.emit(this.items);

    const filteredItems = this.items.filter((item) => {
        return item.name.toLowerCase().includes(searchedText.toLowerCase());
    })

    this.searchCompleted.emit(filteredItems);
  }
}
