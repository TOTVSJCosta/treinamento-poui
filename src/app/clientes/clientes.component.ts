import { Component, ViewChild } from '@angular/core';
import { PoPageAction, PoModalComponent, PoTableColumn, PoTableDetail, PoTableComponent } from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  @ViewChild('modelCliente', { static: true }) poModal: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(private router: Router) {}

  opcao = 0;

  readonly actions = [
    {label: 'Incluir', action: () => this.opcao  = 3},
    {label: 'Alterar', disabled: true, action: this.Alterar.bind(this)},
    {label: 'Visualizar', disabled: true, action: () => this.opcao  = 2},
    {label: 'Excluir', disabled: true, action: () => this.opcao  = 5},
  ]

  Alterar() {
    this.opcao = 4;
   this.poTable = this.poTable;
  }
  OpcaoClicada(botao: String) {
    this.opcao = 0;
  }

  /*antigo
    readonly actions = [
    {label: 'Incluir', action: this.Incluir.bind(this)},
    {label: 'Alterar', disabled: true, action: this.Alterar.bind(this)},
    {label: 'Visualizar', disabled: true, action: this.Incluir.bind(this)},
    {label: 'Excluir', disabled: true, action: this.Excluir.bind(this)},
  ]

  Incluir() {
    this.opcao = 3;
    this.router.navigateByUrl('/editsa1');
  }

  Alterar() {
    this.opcao = 4;
    this.router.navigateByUrl('/editsa1');
  }

  Excluir() {
    this.opcao = 5;
    this.router.navigateByUrl('/editsa1');
  }

  Visual() {
    this.opcao = 2;
    this.router.navigateByUrl('/editsa1');
  }*/

  readonly colunasSA1: Array<PoTableColumn> = [
    {property: 'filial', width: '5%', sortable: false},
    {property: 'codigo', width: '10%'},
    {property: 'loja', width: '5%', sortable: false},
    {property: 'cgc', label: 'CNPJ/CPF'},
    {property: 'ie', label: 'Insc. Estadual'},
    {property: 'nome', label: 'Nome'},
    {
      property: 'tpessoa',
      type: 'subtitle',
      subtitles: [
        { value: 'J', color: 'color-01', label: 'Pessoa Jurídica', content: 'J' },
        { value: 'F', color: 'color-02', label: 'Pessoa Física', content: 'F' },
        { value: ' ', color: 'color-07', label: 'Cadastro Incompleto', content: 'E'},
      ]
    },
    {property: 'end', label: 'Endereço'},
    {property: 'bairro'},
    {property: 'tipo', label: 'Tp. Cliente'},
  ]

  readonly camposSA1 = [
    {
      property: 'nome',
      gridColumns: 4,
      gridSmColumns: 12,
      label: 'Nome',
      clean: true,
    },
    {
      property: 'tpessoa',
      gridColumns: 1,
      label: 'Tipo Pessoa',
      options: [
        { state: 'Jurídica', code: 'J' },
        { state: 'Física', code: 'F' }
      ],
      hideSearch: true,
      fieldLabel: 'state',
      fieldValue: 'code',
      //validate: this.tpch.bind(this)
    },
  ]

  openModal() { 
    this.poModal.open();
  }

  save() {

  }

  cancel() {
    
  }

  select1(row: any) {
    this.actions[1].disabled = !row.$selected;
    this.actions[2].disabled = !row.$selected;
    this.actions[3].disabled = !row.$selected;
  }
}
