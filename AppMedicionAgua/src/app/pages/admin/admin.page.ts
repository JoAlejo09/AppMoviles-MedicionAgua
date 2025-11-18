import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase-service';
import { AdmindetalleComponent } from 'src/app/components/admindetalle/admindetalle.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [ CommonModule, DatePipe, IonicModule],
  providers:[ModalController]
})
export class AdminPage implements OnInit {

  lecturas: any[]= []

  constructor(private supabase: SupabaseService, private modal:ModalController, private router:Router) { }

  async ngOnInit() {
    await this.cargarLecturas();
  }
  async cargarLecturas(){
    const {data,error} = await this.supabase.obtenerTodaslasLecturas();
    if (!error){
      this.lecturas = data;
    }
  }
  async abrirDetalle(lectura: any){
    const mod = await this.modal.create({
      component: AdmindetalleComponent,
      componentProps:{lectura}
    });
    mod.onDidDismiss().then(async r=>{
      if(r.data.refresh){
        await this.cargarLecturas();
      }
    });
    return mod.present();
  }
  async cerrarSesion(){
   await this.supabase.signOut();
   this.router.navigate(['/login']);
  }

}
