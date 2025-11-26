-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS tareadb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE tareadb;

-- Tabla de usuarios
CREATE TABLE usuarios (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('administrador', 'usuario') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tareas
CREATE TABLE tareas (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT NOT NULL,
  estado VARCHAR(60) NOT NULL,
  id_creado BIGINT NOT NULL,
  id_asignado BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_limite DATE NOT NULL,
  FOREIGN KEY (id_creado) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (id_asignado) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de active_tokens
CREATE TABLE active_tokens (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  token TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
);