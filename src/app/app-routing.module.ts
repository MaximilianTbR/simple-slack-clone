import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { LoginComponent } from './login/login.component';
import { SingleChannelComponent } from './single-channel/single-channel.component';
import { StartscreenComponent } from './startscreen/startscreen.component';

const routes: Routes = [
  { path: 'channel', component: StartscreenComponent },
  { path: 'directMessage/:id', component: DirectMessageComponent },
  { path: 'channel/:id', component: StartscreenComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
