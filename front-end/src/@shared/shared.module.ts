import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { AnimationCpnDirective } from './directives/animation-cpn.directive';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, LayoutComponent, AnimationCpnDirective],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent, LayoutComponent, AnimationCpnDirective]
})
export class SharedModule { }
