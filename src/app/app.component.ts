import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { ApiBasedEventComponent } from "./event/components/apiBasedEvent/api-based-event/api-based-event.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ApiBasedEventComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
