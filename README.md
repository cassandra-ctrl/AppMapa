# Instrucciones para ejecutar el proyecto

## Requisitos previos
1. Tener Node.js instalado desde [aquí](https://nodejs.org/dist/v22.13.0/node-v22.13.0-x64.msi).
2. Tener Visual Studio Code instalado desde [aquí](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user).
3. Tener la aplicacion ExpoGo instalada en tu celular

## Pasos para ejecutar el proyecto
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/cassandra-ctrl/AppMapa.git

2. Abrir el proyecto en Visual Studio Code:
   ```bash
    code .\AppMapa\
    
3. Instalar dependencias:
   ```bash
    npm install

4. Instalar dependencias especificas de expo:
   ```bash
    npx expo install react-native-web @expo/metro-runtime

5. Ejecutar el proyecto en modo web:
   ```bash
    npm run web
    
6. Escanear el codigo QR que aparece en la terminal, desde la aplicacion de ExpoGo en tu celular

