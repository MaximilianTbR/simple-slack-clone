import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'channel', component: ChannelComponent },
  { path: 'directMessage/:id', component: DirectMessageComponent },
  { path: 'channel/:id', component: ChannelComponent },
  { path: '', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
