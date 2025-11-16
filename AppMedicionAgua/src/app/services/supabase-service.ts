import { Injectable, inject } from '@angular/core';
import { createClient, type SupabaseClient, type Session } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  // Definición de las propiedades y el constructor aquí
  private supabase: SupabaseClient; // cliente
  private _session$ = new BehaviorSubject<Session | null>(null); //control de ssesion
  session$ = this._session$.asObservable();
  //  
  
  constructor() {
    this.supabase = createClient(environment.supabaseURL, environment.supabaseAnonKey);
    // Recupera sesión al iniciar
    this.supabase.auth.getSession().then(({ data }) => this._session$.next(data.session));
    // Escucha cambios de sesión (login/logout/refresh)
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._session$.next(session);
    }); 
  }
  //obtener cliente
  get client() {
    return this.supabase; 
  }
  // metodo para conectar usuario  
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }
  // metodo para cerrar sesion
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
  //oBTENER LA SESION ACTUAL
  async getCurrentSession() {
    const { data } = await this.supabase.auth.getSession();
    return data.session;
  }
  
  
}
