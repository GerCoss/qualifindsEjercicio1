# Instrucciones para ejecutar el Dockerfile

Estas son las instrucciones para ejecutar el programa para la extracción de departamentos del sitio https://super.walmart.com.mx/.

## Paso 1: Clonar el repositorio

Clonar el repositorio que contiene el Dockerfile:

```bash
git clone https://github.com/GerCoss/qualifindsEjercicio1.git
```

## Paso 2: Moverse al directorio del Dockerfile

Moverse al directorio donde se encuentra el Dockerfile:

```bash
cd <directorio del Dockerfile>
```

## Paso 3: Construir la imagen Docker

Construir la imagen Docker a partir del Dockerfile:

```bash
docker build -t <nombre de la imagen> .
```

## Paso 4: Ejecutar el contenedor Docker

Ejecuta un contenedor basado en la imagen creada con el siguiente comando:

```bash
docker run -v ${PWD}:/app/output <nombre de la imagen>
```

Una vez que se ejecuta el comando, el contenedor Docker se ejecutará y generará el archivo JSON correspondiente en la carpeta compartida del host.



