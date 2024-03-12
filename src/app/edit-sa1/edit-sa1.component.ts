import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-sa1',
  templateUrl: './edit-sa1.component.html',
  styleUrls: ['./edit-sa1.component.css']
})
export class EditSA1Component implements OnChanges {
  @Input() opcao!: Number;
  @Input() table!: any;
  @Output() Clicado = new EventEmitter<String>();

  loja: String;

  constructor(
    private router: Router,
    private http: HttpClient)
    {
      this.loja = '01';
    }


  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  readonly actions = [
    {label: 'Incluir', url: 'editsa1'},
    {label: 'Alterar', disabled: true},
    {label: 'Visualizar', disabled: true},
    {label: 'Excluir', disabled: true},
  ]

  readonly colunasSA1 = [
    {property: 'filial', width: '5%'},
    {property: 'codigo', width: '10%'},
    {property: 'loja', width: '5%'},
    {property: 'cgc', label: 'CNPJ/CPF'},
    {property: 'ie', label: 'Insc. Estadual'},
    {property: 'nome', label: 'Nome'},
    {property: 'tpessoa', label: 'Tp. Pessoa'},
    {property: 'end', label: 'Endere�o'},
    {property: 'bairro'},
    {property: 'tipo', label: 'Tp. Cliente'},
  ]

  readonly camposSA1 = [
    {
      property: 'nome',
      gridColumns: 4,
      gridSmColumns: 12,
      label: 'Nome',
      clean: false,
    },
    {
      property: 'tpessoa',
      gridColumns: 2,
      label: 'Tipo Pessoa',
      options: [
        { state: 'Jurídica', code: 'J' },
        { state: 'Física', code: 'F' },
        { state: 'X', code: 'E' },
        { state: ' ', code: ' ' },
      ],
      optionsMulti: false,
      hideSearch: true,
      fieldLabel: 'state',
      fieldValue: 'code',
      //validate: this.tpch.bind(this)
    },
    {
      property: 'endereco',
      gridColumns: 4,
      label: 'Endereço',
      clean: true,
    },
    {
      property: 'uf',
      gridColumns: 2,
      label: 'UF',
      searchService: 'https://po-sample-api.onrender.com/v1/heroes',
      columns: [
        { property: 'nickname', label: 'Hero' },
        { property: 'label', label: 'Name' }
      ],
      format: ['nickname'],
      fieldLabel: 'nickname',
      fieldValue: 'email'
    },
  ]

  save() {
    //alert('Registro gravdo com sucesso');
    //this.router.navigateByUrl('clientes');

    this.http.post('http://localhost:8080/rest/poui/cliente', {body: `{"loja": " ${this.loja} "}`})
      .subscribe();
       
    this.Clicado.emit('salvar')
  }

  cancel() {
    //this.router.navigateByUrl('clientes');
    this.Clicado.emit('cancelar')
  }

  saveNew() {

  }
}
