import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';

const routes: Routes = [
  { path: 'channel', component: ChannelComponent },
  { path: 'directMessage/:id', component: DirectMessageComponent },
  { path: 'channel/:id', component: ChannelComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
