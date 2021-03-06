import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SidenavComponent } from './_common/sidenav/sidenav.component';
import { DashboardComponent } from './_components/admin/dashboard/dashboard.component';
import { HeaderComponent } from './_common/header/header.component';

import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './_components/admin/login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AlertComponent } from './_alert';
import { ToastrModule } from 'ngx-toastr';
import { QuestionnairesComponent } from './_components/admin/questionnaires/questionnaires.component';
import { AddQuestionnairesComponent } from './_components/admin/questionnaires/add/add.component';
import { FrontendHeaderComponent } from './_components/frontend/frontend-header/frontend-header.component';
import { FrontendFooterComponent } from './_components/frontend/frontend-footer/frontend-footer.component';
import { FrontEndDashboardComponent } from './_components/frontend/dashboard/dashboard.component';
import { FrontEndResultComponent } from './_components/frontend/result/result.component';
import { SurveyComponent } from './_components/admin/survey/survey.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    SidenavComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    QuestionnairesComponent,
    AddQuestionnairesComponent,
    FrontEndDashboardComponent,
    FrontendHeaderComponent,
    FrontendFooterComponent,
    FrontEndResultComponent,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton: true,
      preventDuplicates: true,
    }),
   ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
