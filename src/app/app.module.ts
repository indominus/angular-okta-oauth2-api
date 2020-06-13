import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {CallbackComponent} from './callback/callback.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {AuthHelper} from './auth/auth-helper';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [AuthHelper],
  bootstrap: [AppComponent],
})
export class AppModule {
}
