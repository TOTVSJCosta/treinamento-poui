import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PoPageLogin } from '@po-ui/ng-templates';
import { PoMenuItem, PoNotificationService } from '@po-ui/ng-components';
import { ProAppConfigService, ProThreadInfoService, ProUserInfo } from '@totvs/protheus-lib-core';
import { LoginService, UserInfo } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLogged = false;
  userInfo: UserInfo;

  protected menu: PoMenuItem[] = [
    { label: "Início", icon: "po-icon-home", shortLabel: "Início", link: "/"},
    { label: "Monitoramento", icon: "po-icon-eye", shortLabel: "Monitoramento", link: "/monitoramento",
    subItems: [
      { label: "Aplicação", link: "/appmonitor"},
      { label: "Banco de dados", link: "/dbmonitor"},
    ]},
    { label: "Listagens", icon: "po-icon-home", shortLabel: "Listagens", link: "/listagem",
    subItems: [
      { label: "Clientes", icon: "po-icon-user", shortLabel: "Clientes", link: "/clientes"},
      { label: "Integrações", icon: "po-icon-settings", shortLabel: "Integrações", link: "/integracoes"},
    ]
    },
  ]

  readonly profile = {
    title: 'usuário não identificado',
    subtitle: '???',
    avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
  }

  constructor(
    private proAppConfigService: ProAppConfigService,
    private proThreadInfoService: ProThreadInfoService,
    private loginService: LoginService,
    private msg: PoNotificationService)
  {}

  ngOnInit(): void {
    //this.menus = this.menuService.getMenu();
    //this.menus.forEach(menu => this.menu = menu);
    //console.log(sessionStorage.getItem('PO_USER_LOGIN'));

    this.isLogged = this.proAppConfigService.insideProtheus();

    if (this.isLogged) {
      let userInfo: UserInfo = JSON.parse(localStorage.getItem("userInfo") ?? '');

      this.isLogged = true;
      this.userInfo = {...userInfo};
      this.profile.title = userInfo.nome
      this.profile.subtitle = `Empresa: ${userInfo.empresa} Filial: ${this.userInfo.filial}`;
      /*
      let empresas = sessionStorage.getItem('ProBranch') ?? '';
      console.log(sessionStorage.getItem('ProBranch'));

      let emp = JSON.parse('{"CompanyCode":"99","EnterpriseGroup":"99","ParentCode":"01","Code":"01","Description":"MATRIZ"}');

      this.userInfo.empresa = emp.CompanyCode;
      this.userInfo.filial = emp.Code;

      //this.proThreadInfoService.getUserInfoThread().subscribe({
      //  next: (res: any) => this.userInfo = res
      //});
      */

      this.menu.push({ label: "Sair", icon: "po-icon-exit", shortLabel: "Sair", link: "/closeapp"})
    }

  }


  login(event: any) {
    this.loginService.login(event).subscribe((user: any) => {
      this.userInfo = user;
      this.isLogged = true;
      this.profile.title = this.userInfo.nome;
      this.profile.subtitle = `Empresa: ${this.userInfo.empresa} Filial: ${this.userInfo.filial}`;

    }, (error: any) => {
      this.msg.error('Acesso negado!')
      this.isLogged = false;
    })
  }
  /*
  meodo #1
   this.loginService.login(e).subscribe(
      user => {
        this.userInfo = { ...user};
        this.profile.title = this.userInfo.user;
        this.profile.subtitle = `Emp: ${this.userInfo.emp} Filial: ${this.userInfo.fil}`;
        this.okProtheus = true;
        console.warn('...',this.userInfo)
      }
    )
  
    metodo #2
  protected login(e: any) {
    this.loginService.login(e).subscribe({
      next: (user: UserInfo) => { 
        this.userInfo = user; this.isLogged = true; console.warn(user)
      },
      error: error => { 
        console.log(error.message); this.isLogged = false; this.msg.error('Acesso negado') 
      },
      complete: () => {
        this.profile.title = this.userInfo.nome;
        this.profile.subtitle = `Emp: ${this.userInfo.emp} Filial: ${this.userInfo.fil}`;
      }
    })
  }*/
  

  Exit() {
    this.proAppConfigService.callAppClose(true);
  }

  
}
