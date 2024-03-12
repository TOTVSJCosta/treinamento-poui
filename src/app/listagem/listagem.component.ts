import { Component, ViewChild } from '@angular/core';
import { PoPageAction, PoModalComponent, PoModalAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  protected actions: PoPageAction[] = [
    {
      label: 'Incluir',
      action: this.Incluir.bind(this),
    },
    {
      label: 'Alterar',
      disabled: true
    },
    {
      label: 'Visualizar',
      disabled: true
    },
    {
      label: 'Excluir',
      disabled: true
    },
    {
      label: 'Imprimir'
    },
  ];

  Incluir() {
    this.poModal.open();
  }

  Confirm: PoModalAction = {
    action: () => {
      
      this.poModal.close();
    },
    label: 'Confirmar'
  };

  Cancelar: PoModalAction = {
    action: () => {
      
      this.poModal.close();
    },
    label: 'Cancelar'
  };
}
