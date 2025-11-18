import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase-service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admindetalle',
  templateUrl: './admindetalle.component.html',
  styleUrls: ['./admindetalle.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    IonicModule   // ⬅️ ÚNICO IMPORT de Ionic
  ],
  providers: [ModalController]
})
export class AdmindetalleComponent {

  @Input() lectura: any;

  constructor(
    private modalCtrl: ModalController,
    private supabase: SupabaseService
  ) {}

  eliminarLectura() {
    this.supabase.eliminarLectura(this.lectura.data.id);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
