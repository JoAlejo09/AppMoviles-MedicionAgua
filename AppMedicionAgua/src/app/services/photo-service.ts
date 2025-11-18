import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { SupabaseService } from './supabase-service';

export interface PhotoLocation {
  lat: number;
  lon: number;
  mapsLink: string;
}

export interface CapturedPhoto {
  base64Data: string;
  fileName: string;
  webPath?: string;
  location?: PhotoLocation;
}
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor() {}

  // TOMA FOTO Y DEVUELVE FILE + UBICACIÓN
  async tomarFoto(): Promise<{ file: File; ubicacion: { lat: number; lng: number } }> {
    // Tomar foto
    const foto = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    // Obtener localización
    const coordinates = await Geolocation.getCurrentPosition();
    const ubicacion = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
    // Convertir a File
    const file = await this.convertirFotoAFile(foto);
    return { file, ubicacion };
  }

  // CONVERSIÓN A FILE
  private async convertirFotoAFile(foto: any): Promise<File> {
    const response = await fetch(foto.webPath!);
    const blob = await response.blob();

    return new File([blob], `foto_${Date.now()}.jpg`, { type: blob.type });
  }
}
 