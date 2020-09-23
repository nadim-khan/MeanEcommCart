import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent , LoginDialogComponent, RegisterDialogComponent, BroadcastDialogComponent} from './app.component';
import { MaterialModule } from './material/material/material.module';
import { HomeComponent } from './home/home.component';
import { ProductsModule } from './products/products.module';
import { ContactComponent } from './contact/contact.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { FeeStructureComponent, AddFeeDialogComponent } from './fee-structure/fee-structure.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    HomeComponent,
    ContactComponent,
    FeeStructureComponent,
    AboutComponent,
    BroadcastDialogComponent,
    AddFeeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ProductsModule,
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent, BroadcastDialogComponent, AddFeeDialogComponent ],
  providers: [ { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
