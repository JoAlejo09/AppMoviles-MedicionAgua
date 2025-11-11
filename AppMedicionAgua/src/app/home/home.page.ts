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
  //Inyeccion de dependencias en lugar del constructor
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private supa = inject(SupabaseService);
  //Control de usuarios
  loading = signal(false);
  errorMsg = signal<string | null>(null);
  infoMsg = signal<string | null>(null);
  //Validaciones
    form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  async onLogin(){
    this.resetMessages();
    if (this.form.invalid) return;
    this.loading.set(true);
    const { email, password } = this.form.value;

    try {
      await this.supa.signIn(email!, password!);
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (err: any) {
      this.errorMsg.set(err.message ?? 'Error al iniciar sesión');
    } finally {
      this.loading.set(false);
    }

  }
  private resetMessages() {
    this.errorMsg.set(null);
    this.infoMsg.set(null);
  }

}
