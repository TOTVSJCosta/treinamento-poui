import { Component, ViewChild } from '@angular/core';

import { PoPageAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-appmonitor',
  templateUrl: './appmonitor.component.html',
  styleUrls: ['./appmonitor.component.css']
})
export class AppmonitorComponent {
  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  private linhasSelecionadas = 0;

  constructor() {}

  breadcrumb = {items: [
    { label: 'POUI', link: 'home' },
    { label: 'Monitoramento', link: 'monitoramento' },
    { label: 'AppMonitor' },
  ]}

  appMonCols: Array<PoTableColumn> = [
    {
      property: 'user',
      type: 'icon',
      action: this.lockServer.bind(this),
      color: 'color-01',
      icons: [
        { value: 'aluno', icon: 'po-icon-user' },
        { value: 'LSPULSE', icon: 'po-icon-lock' },
       ],
      sortable: false,
    },
    {
      property: 'user',
      label: 'Usuário',
      width: '5%'
    },
    {
      property: 'host',
      label: 'Nome maquina local',
    },
    {
      property: 'tid',
      label: 'Thread ID',
      type: 'number'
    },
    {
      property: 'server',
      label: 'Servidor',
    },
    {
      property: 'env',
      label: 'Ambiente',
      type: 'label',
        labels: [
          { value: 'P12R2310', color: 'color-11', label: 'Atualizado' },
          { value: '', color: 'color-08', label: 'Desconhecido' }
        ]
    },
    {
      property: 'conn',
      label: 'Hora conexão',
      sortable: false,
    },
    {
      property: 'ctype',
      label: 'Tipo conexão',
    }
  ]
  
  select1(row: any) {
    this.linhasSelecionadas += row.$selected ? 1 : -1
  
    this.actions[0].disabled = this.linhasSelecionadas == 0;
  }

  protected actions: PoPageAction[] = [
    {
      label: 'Desconectar usuários',
      action: this.DisconnAll.bind(this),
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
    {
      label: 'Atualizar',
      icon: 'po-icon-refresh',
      action: this.lockServer.bind(this),
      visible: true,
      type: 'icon'
    },
  ];

  protected lineActions: PoPageAction[] = [
    {
      label: 'Desconectar usuário',
      action: this.lockServer.bind(this),
      disabled: false,
      icon: 'po-icon-clear-content'
    },
    {
      label: 'Enviar mensagem',
      action: this.lockServer.bind(this),
      disabled: false,
      icon: 'po-icon-chat'
    },
  ];

  selectAll(linhas: any) {
    linhas.forEach(() => {
      ++this.linhasSelecionadas;
    })
  }

  DisconnAll() {
    this.poTable.itemsSelected.forEach(linha => {

    })
  }

  

  lockServer() {
    alert('clicou bloquear')
  }


}
