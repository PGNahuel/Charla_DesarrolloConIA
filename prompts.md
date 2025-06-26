# Creación de la aplicación base

## Prompt 1
En la carpeta "example" va a contener todo un backend que sea un CRUD de documentos, estos documentos van a representar curriculum vitae de personas.
La aplicación debe estar escrita en typescript y debe usar express como framework.
La curriculum van a estar representado por:
- Nombre y apellido de la persona dueña
- Contenido del curriculum, solo será un string de un archivo markdown.
- Fecha de creación
- Número de versión

La aplicación debe tener las siguientes funcionalidades:
- Crear un nuevo curriculum
- Leer un curriculum
- Actualizar un curriculum
- Borrar un curriculum

Además, la aplicación deberá tener un frontend básico que permita estas operaciones. No debe estar separado del backend.

La información se guardara en una base de datos sqllite creada para esta aplicación, el nombre de la base de datos será "curriculum.db".

Deberá tener un archivo README.md con instrucciones para ejecutar la aplicación.

Toda la aplicación debe, obligatoriamente, respetar los principios SOLID. Ya que se espera que en un futuro se le agregue más funcionalidades a esta aplicación y las formas de acceso a la información puedan variar. 

# Creación de un MCP

## Prompt 1
Un MCP me permite interactuar con la inteligencia artificial de una manera que esta tendrá herramientas para ejecutar lo que el MCP implemente.

Para la implementación podes estudiar este repositorio: https://github.com/modelcontextprotocol/typescript-sdk

Y quiero que tomes el archivo@curriculumRoutes.ts para que todos los endpoints declarados sean una tool de un MCP.

Para realizar esto, luego de estudiar el repositorio, quiero que crees en una nueva carpeta llamada "tools" (dentro de la aplicación generada en la carpeta example) la implementación de un MCP. De esta manera en lugar de que la aplicación sea una API, será un MCP.

Instalá todas las dependencias necesarias.

## Prompt 2

¿Podes generar un archivo readme para el uso y configuración del MCP?
