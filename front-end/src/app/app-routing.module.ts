import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from 'src/@core/auth/auth.guard';
import { AuthUserGuard } from 'src/@core/auth/auth-user.guard';

// AuthUserGuard dùng xác định tuyến đường cho người dùng có quyền User
// AuthGuard dùng xác định tuyến đường cho người dùng có quyền Admin

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomepageComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule), canActivate: [AuthGuard] },
  // {
  //   path: 'home', component: LayoutComponent, children: [
  //     { path: '', component: HomepageComponent }
  //   ]
  // },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
