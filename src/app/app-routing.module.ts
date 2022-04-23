import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswersComponent } from './components/answers/answers.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { ExportdataComponent } from './components/exportdata/exportdata.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  // {
  //   path: 'editStore/:id',
  //   component: EditTiendaComponent,
  // },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
  },
  {
    path: 'questions',
    component: QuestionsComponent,
  },
  {
    path: 'question',
    component: QuestionComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'answers',
    component: AnswersComponent,
  },
  {
    path: 'export',
    component: ExportdataComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
