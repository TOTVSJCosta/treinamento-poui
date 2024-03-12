import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PoPageAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-appmonitor',
  templateUrl: './appmonitor.component.html',
  styleUrls: ['./appmonitor.component.css']
})
export class AppmonitorComponent {
  @ViewChild('table') appMonTable: PoTableComponent;

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  protected linhasSelecionadas = 0;

  constructor(private http: HttpClient) {}

  select(linhas: any) {
    if (linhas.length) {
      this.linhasSelecionadas = linhas[0].$selected ? linhas.length : 0;
    } else {
      this.linhasSelecionadas += linhas.$selected ? 1 : -1
    }
  }

  evalLine(event: any) {
    let action = event.currentTarget.id;

    this.appMonTable.itemsSelected.forEach(linha => {
      action === 'sendMsg' ? this.sendMsg(linha) : this.dropUser(linha);
    })
  }

  sendMsg(linha: any) {}

  dropUser(linha: any) {
    let ret = this.http.delete('http://localhost:8080/rest/poui/dropuser', {body: JSON.stringify(linha)})
    ret.subscribe();
      /*.pipe(
        catchError(error => {
          if (error.status !== 0) {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            this.msg.error('Acesso negado');
          }
          // Return an observable with a user-facing error message.
          return throwError(() => new Error('Something bad happened; please try again later.'));
        })
      );*/
  }




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
