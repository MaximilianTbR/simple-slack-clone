import { Component, Input, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { map } from 'rxjs';
import { Channel } from '../models/channel';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Storage, ref, uploadBytesResumable, getDownloadURL, StorageReference } from '@angular/fire/storage';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NgbTypeaheadConfig, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'
import { StartscreenComponent } from '../startscreen/startscreen.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';



@Component({
  selector: 'app-single-channel',
  templateUrl: './single-channel.component.html',
  styleUrls: ['./single-channel.component.scss'],
})


export class SingleChannelComponent implements OnInit {
  
code
  allParticipants
  unReadMessage;
  channel = new Channel;
  UserName = this.Start.UserName;
  message: string;
  allUsers;
  refreshing = false;
  channelID = '';
  userIsNotKnown = 0;
  files = [];
  public file: any = {};
  userId: string;
  imgDownloadURL = '';
  allMessages: any = [];
  imgAvailable = false;

  constructor(
    public storage: Storage,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public dialog: MatDialog,
    public Start: StartscreenComponent
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(paramMap => {
      this.channelID = paramMap.get('id');
      this.getChannel();
    });
    this.loadAllMessages();
    this.sortsMessages();

  }


  test() {
    console.log(this.allParticipants)
  }


  openDialog(): void {
    this.dialog.open(NameDialogComponent);
  }


  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = channel,
        this.loadAllMessages()
        this.loadAllParticipants() }
      )
  }

  
  TestCodeMessage() {
    if (this.code)
      this.code = false;
    else (this.code = true)
    console.log(this.code)
  }


  openCurrentUser(userID) {
    this.dialog.open(UserDetailComponent, {
      data:
      {
        UserID: userID,
        docIDfromUser: this.Start.docIDfromUser
      }
    })
  }

  loadAllMessages() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('channelMessages')
      .valueChanges()
      .subscribe(allMessages => {
        this.allMessages = allMessages
        console.log(this.allMessages, 'these are all messages')
        this.sortsMessages()
      });
  }


  loadAllParticipants(){
    this.firestore
    .collection('channels')
    .doc(this.channelID)
    .collection('test')
    .valueChanges()
    .subscribe(allParticipants=> {
      this.allParticipants = allParticipants
    })
  }

  sortsMessages() {
    this.allMessages.sort((a, b) => {
      return Number(a.timestampe) - Number(b.timestampe);
    });

  }



  sendMessage() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('channelMessages')
      .add({
        text: this.message,
        userID: this.Start.docIDfromUser,
        userName: this.Start.UserName,
        timestampe: new Date().getTime(),
        imgAvailable: this.imgAvailable,
        imgDownloadURL: this.imgDownloadURL
      })
    this.message = '';
    this.unreadMessage()
  }

  unreadMessage(){
    for (let i = 0; i < this.allParticipants.length; i++) {
      let element = this.allParticipants[i];
      
      if(element.participant == this.Start.docIDfromUser)
        {}
        else(
          
          this.firestore
          .collection('users')
          .doc(element.participant)
          .collection('userChannels')
          .doc(element.UserChannelID)
          .valueChanges()
          .subscribe((hallo)=>
          {
            let newUnread = hallo["unReadMessage"];
            if(newUnread == this.unReadMessage) 
            {this.irgendwas(element, newUnread)}
            
            console.log(this.unReadMessage)
            
          })
           
        )
        
    }
  }
  
 irgendwas(element, newUnread){
  newUnread++;
  this.firestore
        .collection('users')
        .doc(element.participant)
        .collection('userChannels')
        .doc(element.UserChannelID)
        .update({
            unread: true,
            unReadMessage : newUnread,
        })  
 }

  chooseFile(event: any) {
    this.file = event.target.files[0];
  }

  addData() {
    const StorageRef = ref(this.storage, 'allChannelPictures/' + this.file.name)
    const uploadTask = uploadBytesResumable(StorageRef, this.file)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, (error) => {
      console.log(error.message)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        if (downloadURL) {
          this.imgDownloadURL = downloadURL;
          this.imgAvailable = true;
          console.log(this.imgDownloadURL)
        }
      });
    })
  }


  createFolder(folderName: string) {
    //const parentFolder = this.storage.ref('users');
    //const newFolder = parentFolder.child(folderName);
    // The folder has been created, but it doesn't actually exist on the server until you start uploading files to it.
  }

  // In Progress
  uploadFile(event) {
    let file = event.target.files[0];
    const filePath = './assets/img/';
    console.log(file);
    //const task = this.storage.upload(filePath, file);
    //this.files.push(task);
    console.log(this.storage)
  }
  selectedFile: File = null;


}
