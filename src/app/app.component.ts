import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PoPageLogin } from '@po-ui/ng-templates';
import { PoMenuItem } from '@po-ui/ng-components';
import { ProAppConfigService } from '@totvs/protheus-lib-core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLogged = false;

  protected menus!: Observable<PoMenuItem[]>;
  protected menu: PoMenuItem[] = []

  constructor(
    private proAppConfigService: ProAppConfigService,
    private menuService: MenuService)
  {}

  ngOnInit(): void {
    this.menus = this.menuService.getMenu();
    this.menus.forEach(menu => this.menu = menu);

    this.isLogged = true;//this.proAppConfigService.insideProtheus();

    console.log(sessionStorage.getItem('PO_USER_LOGIN'));
  }

  ngAfterViewInit() {

  }


  

  Exit() {
    this.proAppConfigService.callAppClose(true);
  }

  
}
