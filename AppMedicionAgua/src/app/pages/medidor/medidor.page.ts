import { Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase-service';
import { PhotoService } from 'src/app/services/photo-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.page.html',
  styleUrls: ['./medidor.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class MedidorPage {
  fotoMedidor: any = null;
  fotoCasa: any = null;
  loading=false;
  lecturasUsuario: any[] = [];

  form = this.fb.group({
    valor:['',Validators.required],
    observaciiones:['']
  });

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private photoService: PhotoService,
    private router: Router
  ){ }
  //Foto medidor
  async tomarFotoMedidor(){
    this.fotoMedidor = await this.photoService.tomarFoto();
  }
  //Foto casa
  async tomarFotoCasa(){
    this.fotoCasa = await this.photoService.tomarFoto();
  }

  //Guardar lectura
  async guardarLectura(){
    if(this.form.invalid || !this.fotoMedidor || !this.fotoCasa){
      alert("Faltan datos por llenas. Verifique si se han tomado las fotos");
      return;
    }
    this.loading = true;
    try {
      const user = await this.supabase.getUser();
      alert(user)
      if(!user) throw new Error("No hay usuario regisitrado");
      //Almacenamiento de foto de medidor en el storage
      const pathMedidor = `medidor/${user.id}_${Date.now()}.jpg`;
      const urlMedidor = await this.supabase.cargarFotos(
        "lecturas",
        pathMedidor,
        this.fotoMedidor.file
      );
      //Almacenamiento de foto de casa en el storage
      const pathCasa = `casa/${user.id}_${Date.now()}.jpg`;
      const urlCasa = await this.supabase.cargarFotos(
        "lecturas",
        pathCasa,
        this.fotoCasa.file
      );
      const mapaUrl = `https://www.google.com/maps?q=${this.fotoMedidor.ubicacion.lat},${this.fotoMedidor.ubicacion.lng}`;
  
      //INSERCION DE LECTURA EN BASE DE DATOS
      const carga ={
        user_id: user.id,
        valor: this.form.value.valor,
        observaciones: this.form.value.observaciiones || '',
        foto_medidor: urlMedidor,
        foto_casa: urlCasa,
        latitud: this.fotoMedidor.ubicacion.lat,
        longitud: this.fotoMedidor.ubicacion.lng,
        mapa_url: mapaUrl
      };
      const session = await this.supabase.getSession();
      console.log("SESSION:", session);
      console.log("USER ID AUTH:", user.id);
      console.log("USER ID CARGA:", carga.user_id);
      console.log("CARGA FINAL:", carga);
      await this.supabase.insertarLectura(carga);
      alert("Lectura registrada con exito...")
      this.form.reset();
      this.fotoMedidor=null;
      this.fotoCasa = null;
      this.router.navigate(['/medidor']);
    }catch(error){
      console.error(error);
      alert("Error al guardar la lectura");
    }
    this.loading = false;
  }
  async mostrarLecturas(){
    try {
      this.lecturasUsuario = await this.supabase.obtenerLecturas();
      console.log('Lecturas usuario:', this.lecturasUsuario);
 
    } catch (error) {
      alert("No se logro cargar las lecturas anteriore");
      
    }
  }
  async cerrarSesion(){
   await this.supabase.signOut();
   this.router.navigate(['/login']);
  }
    ionViewWillEnter() {
    this.mostrarLecturas();
  }
}
