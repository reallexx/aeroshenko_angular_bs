import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';

const modules = [CommonModule, AvatarModule, ButtonModule];

const components = [HeaderComponent, FooterComponent, LogoComponent, BreadcrumbsComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [HeaderComponent, FooterComponent, BreadcrumbsComponent],
})
export class CoreModule {}
