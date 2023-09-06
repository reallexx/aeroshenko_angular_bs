import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserComponent } from './components/user/user.component';

const modules = [CommonModule, AvatarModule, ButtonModule, ProgressSpinnerModule];

const components = [HeaderComponent, FooterComponent, LogoComponent, NotFoundComponent, UserComponent, LoaderComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [HeaderComponent, FooterComponent, LoaderComponent],
})
export class CoreModule {}
