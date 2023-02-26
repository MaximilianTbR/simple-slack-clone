import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren('messageElements') messageElements: QueryList<ElementRef>;
  allParticipants
  unReadMessage;
  channel = new Channel;
  UserName = this.Start.UserName;
  message: string = '';
  allUsers = [];
  refreshing = false;
  channelID = '';
  userIsNotKnown = 0;
  files = [];
  public file: any = {};
  userId: string;
  imgDownloadURL = '';
  allMessages: any = [];
  allMessages2: any = [];
  imgAvailable = false;
  allFiles = [];
  allImages = [];
  singleMessageToDelete: any;
  singleMessageToDeleteId: any;
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
    this.loadAllMessages2()
  }

  ngAfterViewInit() {
    this.messageElements.changes.subscribe(() => {
      this.scrollMessageListToBottom();
    });
  }
  

  test() {
    console.log(this.messageElements.length)
  }

  scrollMessageListToBottom(): void {
    try {
      this.messageElements.last.nativeElement.scrollIntoView({ behavior: "auto" });
    } catch (err) { }
    console.log(this.messageElements.length)
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
        this.loadAllParticipants()
      }
      )
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
      .subscribe(docs => {
        this.allMessages = docs
        console.log(this.allMessages, 'these are all messages')
        this.sortsMessages()
      });
  }

  loadAllMessages2() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('channelMessages')
      .snapshotChanges()
      .subscribe(docs => {
        this.allMessages2 = docs
        console.log(this.allMessages2, 'these are all messages with docs')
        this.sortsMessages()
      });
  }

  loadAllParticipants() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('test')
      .valueChanges()
      .subscribe(allParticipants => {
        this.allParticipants = allParticipants,
          this.irgendwas2()
      })
  }

  irgendwas2() {
    for (let i = 0; i < this.allParticipants.length; i++) {
      let element = this.allParticipants[i];

      if (element.participant == this.Start.docIDfromUser) {
        this.firestore
          .collection('users')
          .doc(element.participant)
          .collection('userChannels')
          .doc(element.UserChannelID)
          .update({
            unReadMessage: 0,
            unread: false
          })
      }

    }
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
        allImages: this.allImages
      })
    this.message = '';
    this.unreadMessage();
    this.ngAfterViewInit();
  }

  unreadMessage() {
    for (let i = 0; i < this.allParticipants.length; i++) {
      let element = this.allParticipants[i];

      if (element.participant == this.Start.docIDfromUser) {
        // do nothing
      } else {
        console.log(element);
        this.firestore
          .collection('users')
          .doc(element.participant)
          .collection('userChannels')
          .doc(element.UserChannelID)
          .get()
          .toPromise()
          .then(doc => {
            this.irgendwas(element, doc)
          })
      }
    }
  }


  irgendwas(element, doc) {
    let newUnread = doc.data()["unReadMessage"];
    newUnread++; // increase newUnread by 1
    return this.firestore
      .collection('users')
      .doc(element.participant)
      .collection('userChannels')
      .doc(element.UserChannelID)
      .update({
        unread: true,
        unReadMessage: newUnread,
      })
  }

  chooseFile(event: any) {
    this.file = event.target.files[0];
    this.addData();
  }

  addData() {
    const StorageRef = ref(this.storage, this.file.name);
    this.allFiles.push(this.file);
    console.log(this.allFiles)
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
          this.allImages.push(this.imgDownloadURL);
          this.imgAvailable = true;
          console.log(this.allImages);
        }
      });
    })
  }

  deletePicture(index) {
    this.allFiles.splice(index, 1);
    console.log(this.allFiles);
    location.reload();
  }

  deleteMessage(index) {
    //console.log(this.allMessages)
    console.log(this.allMessages2[0].payload.doc.data(), 'all messages in docs bla')
    this.allMessages2.forEach(singleMessage2 => {
      if (singleMessage2.payload.doc.data().text == this.allMessages[index].text) {
        console.log(singleMessage2.payload.doc.data(), this.allMessages[index])
        console.log('it worked!')
        console.log(singleMessage2.payload.doc.data())
        this.singleMessageToDelete = singleMessage2.payload.doc;
        const docId = this.singleMessageToDelete.id;
        console.log('THATS THE ID', docId);
        this.singleMessageToDeleteId = docId;
      }
    });
    this.allMessages.splice(index, 1)
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('channelMessages')
      .doc(this.singleMessageToDeleteId)
      .delete()
  }
}