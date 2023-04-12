import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelarecaptchaComponent } from './telarecaptcha/telarecaptcha.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [{ path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule) },
                        { path: 'telarecaptcha', loadChildren: () => import('./telarecaptcha/telarecaptcha.module').then(m => m.TelarecaptchaModule) },
                        { path: "", redirectTo: "telarecaptcha", pathMatch: "full"},
                        { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
                        { path: 'validacaocad', loadChildren: () => import('./validacaocad/validacaocad.module').then(m => m.ValidacaocadModule) },
                        { path: 'sobre', loadChildren: () => import('./sobre/sobre.module').then(m => m.SobreModule) },
                        { path: 'contato', loadChildren: () => import('./contato/contato.module').then(m => m.ContatoModule) },
                        { path: 'newsletter', loadChildren: () => import('./newsletter/newsletter.module').then(m => m.NewsletterModule) },
                       ];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }