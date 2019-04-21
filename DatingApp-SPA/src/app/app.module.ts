import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AletifyService } from './_services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MembersComponent } from './members/members.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailReslover } from './_resolvers/member-detail-reslover';
import { MemberListReslover } from './_resolvers/member-list-reslover';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditReslover } from './_resolvers/member-edit-reslover';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changed-guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';

export function tokkenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MembersComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      TabsModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
       config: {
         tokenGetter: tokkenGetter,
         whitelistedDomains: ['localhost:5000'],
         blacklistedRoutes: ['localhost:5000/api/auth']
       }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AletifyService,
      AuthGuard,
      MemberDetailReslover,
      MemberListReslover,
      MemberEditReslover,
      PreventUnsavedChanges,
      UserService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
