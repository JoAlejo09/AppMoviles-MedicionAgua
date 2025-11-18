# Proyecto Medidor de Agua – Ionic + Angular + Supabase
- Desarrollado por Jose Pila

Este proyecto es una **aplicación móvil** desarrollada con **Ionic + Angular** que permite a los encargados de tomar lecturas de medidores de agua registrar las mediciones digitalmente, incluyendo fotos, ubicación y observaciones. Además, incluye un panel de **administración** para visualizar todas las lecturas y gestionar datos.

---

## 📋 Funcionalidades

### Para usuarios medidores:
- Registro de lectura de medidor con:
  - Valor de la medición
  - Observaciones
  - Foto del medidor
  - Foto de la vivienda
  - Ubicación geográfica
- Validación de campos obligatorios
- Persistencia de datos en **Supabase**
- Sesión de usuario (login/logout)

<img width="1287" height="614" alt="image" src="https://github.com/user-attachments/assets/bcaa01b2-47f8-48a2-b8be-3b0acbafc1aa" />

<img width="1263" height="246" alt="image" src="https://github.com/user-attachments/assets/afdb13bc-b526-419b-b04d-40bceaded73a" />



### Para administradores:
- Visualización de todas las lecturas en un **grid**
- Vista detallada de cada lectura con fotos y ubicación
- Eliminación de lecturas
- Acceso controlado según el rol del usuario

<img width="1319" height="243" alt="image" src="https://github.com/user-attachments/assets/2fd413a8-8f84-44a5-bbc8-70be46c35a0e" />

<img width="583" height="446" alt="image" src="https://github.com/user-attachments/assets/662da0e6-2234-4aaf-86d0-579047a8e172" />


### Claves de acceso para prueba
- Administrador
-- Usuario: admin12345
-- Password: abcde12345
- Medidor
-- Usuario: josepila0912
-- Password: abcde12345
  

## 🛠 Tecnologías utilizadas

- [Ionic 7](https://ionicframework.com/)
- [Angular 16+](https://angular.io/)
- [Supabase](https://supabase.com/) (autenticación, base de datos, almacenamiento)
- Capacitor para funcionalidades de dispositivo (cámara, geolocalización)
- HTML, SCSS y TypeScript

---

## ⚡ Requisitos previos

Antes de ejecutar el proyecto:

- Node.js ≥ 18
- Ionic CLI ≥ 7
- Angular CLI ≥ 16
- Una cuenta en Supabase con proyecto creado
- Capacitor configurado si se desea ejecutar en dispositivo o emulador

---

## 🔧 Instalación del proyecto

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd <nombre-proyecto>
