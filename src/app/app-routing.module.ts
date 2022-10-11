import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "", redirectTo: "auth", pathMatch: 'full'},
  {path: "auth", loadChildren: () => import('@auth/auth.module').then((m => m.AuthModule))},
  {path: "main", component: MainPageComponent, canActivate: [AuthGuard]},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
