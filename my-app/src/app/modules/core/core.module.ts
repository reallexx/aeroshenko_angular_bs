import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const modules = [CommonModule, AvatarModule, ButtonModule];

const components = [HeaderComponent, FooterComponent, LogoComponent, NotFoundComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
