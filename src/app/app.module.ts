import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ReactiveCrudComponent } from './components/reactive-crud-page/reactive-crud.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { MockBackendDataService } from './components/reactive-crud-page/services/mockBackendData/mock-backend-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { EditDreamComponent } from './components/reactive-crud-page/sub-pages/edit-dream-page/edit-dream.component';
import { AddDreamComponent } from './components/reactive-crud-page/sub-pages/add-dream-page/add-dream.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ReactiveCrudComponent,
    AuthPageComponent,
    EditDreamComponent,
    AddDreamComponent,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MockBackendDataService),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
