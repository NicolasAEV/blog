import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  activeTab: string = 'noticias';

  showTab(tab: string) {
    this.activeTab = tab;
  }
  
}
