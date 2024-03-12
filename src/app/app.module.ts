import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HomeComponent } from './home/home.component';
import { MonitorComponent } from './monitor/monitor.component';
import { Page404Component } from './page404/page404.component';
import { ListagemComponent } from './listagem/listagem.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppmonitorComponent } from './appmonitor/appmonitor.component';
import { DbmonitorComponent } from './dbmonitor/dbmonitor.component';
import { CloseappComponent } from './closeapp/closeapp.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditSA1Component } from './edit-sa1/edit-sa1.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonitorComponent,
    Page404Component,
    ListagemComponent,
    DashboardComponent,
    AppmonitorComponent,
    DbmonitorComponent,
    CloseappComponent,
    ClientesComponent,
    EditSA1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
