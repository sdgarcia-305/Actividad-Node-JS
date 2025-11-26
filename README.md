# Actividad-Node-JS
Creación de una API REST de Gestión de Tareas con usuarios y roles. Solo los administradores pueden crear, actualizar o eliminar tareas. Los usuarios solo pueden verlas.

# 📝 API REST — Gestión de Tareas (Node.js + Express + MySQL)
API REST para gestionar tareas con roles.
Administradores: crear, actualizar y eliminar tareas.
Usuarios: solo pueden ver tareas.

## 🚀 Tecnologías utilizadas
- Node.js
- Express
- MySQL + mysql2/promise
- JWT (autenticación)
- Zod (validación de datos)
- Middlewares personalizados
- GitHub + buenas prácticas

## 📂 Estructura del proyecto
src/
 ├── config/
 │   └── database.js
 ├── controllers/
 │   └── task.controller.js
 ├── middlewares/
 │   ├── auth.middleware.js
 │   ├── checkRole.js
 │   └── validateTaskBody.js
 ├── models/
 │   ├── task.model.js
 │   ├── user.model.js
 │   └── token.model.js
 ├── routes/
 │   └── task.routes.js
 ├── schemas/
 │   └── task.schema.js
 └── index.js

## 🗄️ Base de datos MySQL
Tablas principales:
- usuarios
- tareas
- active_tokens

Incluye claves foráneas y control de tokens activos.

## 🔐 Autenticación
- El login genera un JWT.
- El token se guarda en active_tokens.
- Todas las rutas requieren token (excepto login/register).
- En el header debe enviarse:
- Authorization: Bearer <TOKEN>

# 📌 Endpoints principales
## 🔐 Autenticación
▶ POST /auth/login
Body:
{
  "email": "admin@example.com",
  "password": "123456"
}

Respuesta:
{
  "message": "Login exitoso",
  "token": "jwt..."
}

## 📌 Rutas de Tareas

🔒 Todas requieren token
🔐 Solo admin puede: POST — PUT — DELETE

### 📍 GET /tasks (usuarios y admin)
Devuelve todas las tareas

Respuesta:

[
  {
    "id": 1,
    "titulo": "Tarea 1",
    "descripcion": "Descripción",
    "estado": "pendiente",
    "creador_nombre": "Admin",
    "asignado_nombre": "Usuario"
  }
]

### 📍 GET /tasks/:id
Obtiene una tarea por ID

### 📍 POST /tasks (solo administrador)
Body:
{
  "titulo": "Nueva tarea",
  "descripcion": "Detalles",
  "estado": "pendiente",
  "id_creado": 1,
  "id_asignado": 2,
  "fecha_limite": "2025-01-12"
}

### 📍 PUT /tasks/:id (solo administrador)
Body igual que POST

### 📍 DELETE /tasks/:id (solo administrador)
## 🧪 Validación con ZOD

Toda tarea se valida con:

titulo: string

descripcion: string

estado: pendiente | en progreso | completada

id_asignado: number

fecha_limite: date

## 🧱 Middlewares usados
Middleware	Función
verifyToken	Valida el JWT y que esté activo
checkRole('administrador')	Restringe acciones
validateTaskBody	Valida cuerpo de las tareas

## ✔ Resultados esperados
- API REST funcional
- Roles y permisos implementados
- Validación de datos
- Conexión MySQL real
- Documentación completa
- CRUD de tareas totalmente funcional
