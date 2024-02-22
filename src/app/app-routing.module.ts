import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListagemComponent } from './listagem/listagem.component';
import { MonitorComponent } from './monitor/monitor.component';
import { Page404Component } from './page404/page404.component';
import { AppmonitorComponent } from './appmonitor/appmonitor.component';
import { DbmonitorComponent } from './dbmonitor/dbmonitor.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'monitoramento', component: MonitorComponent},
  { path: 'appmonitor', component: AppmonitorComponent},
  { path: 'dbmonitor', component: DbmonitorComponent},
  { path: 'listagem', component: ListagemComponent},
  { path: '**', component: Page404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
