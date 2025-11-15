import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonInput, IonItem, IonButton, IonLabel, IonList, IonText, IonSpinner
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonInput, IonItem, IonButton, IonLabel, IonList, IonText, IonSpinner],
})
export class HomePage {


}
