import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent} from './layout/main/main.component';
import { DocDetailComponent } from './doc-detail/doc-detail.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/:userName', component: UserComponent },
  { path: 'doc/id/:docId', component: DocDetailComponent },
  { path: 'doc/:docName', component: DocDetailComponent },
  { path: 'create', component: CreateComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
