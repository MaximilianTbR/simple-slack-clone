import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StartscreenComponent } from './Startscreen/startscreen.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-channel/dialog-add-channel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SingleMessageComponent } from './single-message/single-message.component';
import { SingleChannelSidenavLinkComponent } from './single-channel-sidenav-link/single-channel-sidenav-link.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { SingleChannelComponent } from './single-channel/single-channel.component';
import { MatIconModule } from '@angular/material/icon';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    DirectMessageComponent,
    DialogAddUserComponent,
    SingleMessageComponent,
    SingleChannelSidenavLinkComponent,
    LoginComponent,
    StartscreenComponent,
    SingleChannelComponent,
    UploadDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    MatCardModule,
    FormsModule,
    CommonModule,
    EditorModule,
    MatTabsModule,
    MatIconModule,
    AngularFireStorageModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    { provide: BUCKET, useValue: 'my-bucket-name' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
