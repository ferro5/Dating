import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailReslover } from './_resolvers/member-detail-reslover';
import { MemberListReslover } from './_resolvers/member-list-reslover';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditReslover } from './_resolvers/member-edit-reslover';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changed-guard';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent },
    {path: 'members', component: MemberListComponent , resolve: {users: MemberListReslover}},
    {path: 'members/:id', component: MemberDetailComponent , resolve: {user: MemberDetailReslover}},
    {path: 'member/edit', component: MemberEditComponent , resolve: { user: MemberEditReslover}, canDeactivate: [PreventUnsavedChanges] },
    {path: 'messages', component: MessagesComponent },
    {path: 'lists', component: ListsComponent },
    {path: '**', redirectTo: 'home', pathMatch: 'full' },
];
