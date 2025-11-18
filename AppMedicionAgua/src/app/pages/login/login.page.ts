import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service';
import { IonicModule} from '@ionic/angular'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class LoginPage {
  loginForm!: FormGroup; // llamado para el formulario
  loading = false;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) { 
    this.crearFormulario();
  }

  crearFormulario(){
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  //Metodo login
  async login(){
    if(this.loginForm.invalid) return;
    const { user, password} = this.loginForm.value;
    this.loading = true;
    const email = await this.supabaseService.getEmailUser(user);
    if(!email){
      this.loading = false;
      alert("Usuario no se encuentra registrado")
      return;
    }
    const {data, error} = await this.supabaseService.signIn(email,password);
    this.loading = false;
    if(error){
      alert('Usuario o contraseña incorrecta');
      return;
    }
    const userId = data.user.id;
    const {rol} = await this.supabaseService.getUserRol(userId);
    switch(rol){
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'medidor':
        this.router.navigate(['/medidor']);
        break;
      default:
      // Si no tiene rol claro
      alert('Tu cuenta no tiene un rol asignado.');
      this.supabaseService.signOut();
      break;
    }
  }
}
