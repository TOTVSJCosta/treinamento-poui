import { Component } from '@angular/core';
import { ProAppConfigService } from '@totvs/protheus-lib-core';

@Component({
  selector: 'app-closeapp',
  templateUrl: './closeapp.component.html',
  styleUrls: ['./closeapp.component.css']
})
export class CloseappComponent {

  constructor (private proAppConfigService: ProAppConfigService) {
    this.closeApp();
  }

  protected closeApp() {

    if (this.proAppConfigService.insideProtheus()) {
      alert('O App est� sendo executado dentro do Protheus.');
      this.proAppConfigService.callAppClose(true);
    } else {
      alert('O App n�o est� sendo executado dentro do Protheus.');
    }
  }

}
