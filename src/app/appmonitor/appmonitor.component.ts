import { Component } from '@angular/core';

import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-appmonitor',
  templateUrl: './appmonitor.component.html',
  styleUrls: ['./appmonitor.component.css']
})
export class AppmonitorComponent {

  private linhasSelecionadas = 0;

  breadcrumb = {items: [
    { label: 'POUI', link: 'home' },
    { label: 'Monitoramento', link: 'monitoramento' },
    { label: 'AppMonitor' },
  ]}
  
  select1(row: any) {
    this.linhasSelecionadas += row.$selected ? 1 : -1
  
    this.actions[0].disabled = this.linhasSelecionadas == 0;
  }

  protected actions: PoPageAction[] = [
    {
      label: 'Desconectar usuário',
      action: this.lockServer.bind(this),
      disabled: true,
      icon: 'po-icon-clear-content'
    },
    {
      label: 'Enviar mensagem',
      icon: 'po-icon-chat',
      action: this.lockServer.bind(this),
      visible: true,
      type: 'icon'
    },
    {
      label: 'Bloquear Servidor',
      icon: 'po-icon-lock',
      action: this.lockServer.bind(this),
      visible: true
    },
    {
      label: 'Parar serviço',
      icon: 'po-icon-exclamation',
      action: this.lockServer.bind(this),
      visible: true,
      type: 'icon'
    },
    
  ];

  lockServer() {
    alert('clicou bloquear')
  }


}
