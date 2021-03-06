import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import {AletifyService} from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
   uploader: FileUploader ;
   hasBaseDropZoneOver  = false;
   baseUrl = environment.apiUrl;
   currentMainPhoto: Photo;
  constructor(private authService: AuthService, private userService: UserService, private alertify:  AletifyService) { }

  ngOnInit() {
    this.initializeUploder();
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploder() {
    this.uploader = new FileUploader ({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 10
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }
  setMainPhoto(photo: Photo) {
      this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
       this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
       this.currentMainPhoto.isMain = false;
       photo.isMain = true;
       this.getMemberPhotoChange.emit(photo.url);
      }, error => {
        this.alertify.error(error);
      });
  }
  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
       this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
       this.alertify.success('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed deleted photo');
      });
    });
  }


}
