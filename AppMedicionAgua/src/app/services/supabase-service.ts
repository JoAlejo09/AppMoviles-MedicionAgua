import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseURL,
      environment.supabaseAnonKey
    );
  }

  // ============================
  // AUTH
  // ============================
  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getSession(): Promise<Session | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session;
  }

  async getUser() {
    return (await this.supabase.auth.getUser()).data.user;
  }

  // ============================
  // PERFILES
  // ============================
  async createProfile(userId: string, nombre: string, rol: string) {
    const { data, error } = await this.supabase
      .from('usuarios')
      .upsert({ id: userId, nombre, rol });

    if (error) throw error;
    return data;
  }

  // ============================
  // STORAGE
  // ============================
  async cargarFotos(bucket: string, path: string, file: File) {
    const { error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) throw error;

    return this.supabase.storage
      .from(bucket)
      .getPublicUrl(path).data.publicUrl;
  }

  // ============================
  // LECTURAS
  // ============================
  async insertarLectura(payload: any) {
    const { data, error } = await this.supabase
      .from('lecturas')
      .insert(payload)
      .select();

    if (error) throw error;
    return data;
  }

  async obtenerLecturas() {
    const { data: { user } } = await this.supabase.auth.getUser();

    const { data, error } = await this.supabase
      .from('lecturas')
      .select('*')
      .eq('user_id', user?.id);

    if (error) throw error;
    return data;
  }

  async obtenerTodaslasLecturas() {
    const { data, error } = await this.supabase
      .from('lecturas')
      .select('*');

    if (error) throw error;
    return data;
  }
  //METODO PARA OBTENER ROL DE USUARIO
  async getUserRol(userId:string){
    const { data, error} = await this.supabase
    .from('usuarios')
    .select('rol')
    .eq('id',userId)
    .single();

    return{rol: data?.rol, error}
  }
  async getEmailUser(user:string): Promise<string| null>{
    const {data, error} = await this.supabase
    .from('usuarios')
    .select('email')
    .eq('username', user)
    .single();
    if (error || !data) return null;

    return data?.email
  }
  async resetPassword(email:string){
    return await this.supabase.auth.resetPasswordForEmail(email);
  }
}
