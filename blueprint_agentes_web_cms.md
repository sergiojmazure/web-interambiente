# Blueprint Arquitectónico: Web SPA + CMS Autónomo (Para Agentes de IA)

**Propósito de este documento:**  
Este documento está diseñado como un *prompt* arquitectónico estructurado. Si eres un Agente de IA (LLM) asignado para construir la página web y el panel de administración de una nueva marca, **debes seguir esta arquitectura base como estándar de calidad**. 

Este modelo permite crear un sitio web público extremadamente rápido y estético, acoplado a un CMS (Content Management System) privado donde el propietario del negocio puede auto-gestionar su contenido sin depender de un desarrollador en el futuro.

---

## 1. Stack Tecnológico Obligatorio

Para garantizar la mantenibilidad y eficiencia, debes utilizar estrictamente el siguiente stack:

- **Frontend Core:** React 18+ inicializado con **Vite**.
- **Enrutamiento (Routing):** `react-router-dom` (v6+) implementando Single Page Application.
- **Estilos:** **CSS Puro (Vanilla CSS)**. No utilices frameworks utilitarios como Tailwind a menos que se especifique lo contrario. Debes estructurar un sistema de diseño basado en **CSS Custom Properties** (Variables) en un archivo global (ej. `index.css`).
- **Backend-as-a-Service:** **Supabase**. Lo usarás para:
  - Base de Datos (PostgreSQL) para entidades dinámicas (galerías, entidades de negocio, blog).
  - Autenticación (`@supabase/auth-ui-react` o métodos directos de email/password).
  - Almacenamiento (Supabase Storage) para la subida de imágenes y medios.
- **Gestión de Texto Enriquecido:** Tiptap React (para implementar el editor WYSIWYG en la zona de administración).
- **Despliegue:** Preparado para Netlify (debes generar un archivo `netlify.toml` apropiado para SPA).

---

## 2. Arquitectura del Frontend y Enrutamiento

### 2.1. Separación de Contextos (Público vs. Privado)
La SPA debe tener dos mundos separados controlados en el archivo raíz de rutas (comúnmente `App.jsx`):

1. **Rutas Públicas (`/`, `/nosotros`, `/servicios`, etc.):** 
   - Renderizan de inmediato.
   - Envueltas en componentes universales como `<Navbar>` y `<Footer>`.
2. **Rutas de Administración (`/admin/*`):** 
   - Deben estar "Diferidas" utilizando `React.lazy()` y `<Suspense>` para no afectar la carga inicial del sitio público.
   - No deben mostrar el Navbar y Footer públicos. Deben tener un `<AdminLayout>` exclusivo.
   - Deben estar protegidas por un componente `<ProtectedRoute>` que verifique asíncronamente si existe una sesión válida en Supabase antes de renderizar.

### 2.2. Sistema de Diseño (Variables CSS)
En tu archivo global de estilos (`index.css`), establece un bloque `:root` genérico que permita cambiar fácilmente la identidad corporativa. Ejemplo a adaptar por la marca:

```css
:root {
  /* Marca - El LLM debe adaptar esto a los colores del cliente */
  --color-primary: #HEX; 
  --color-secondary: #HEX;
  --color-bg: #FFFFFF;
  --color-text: #333333;
  --font-display: 'Familia Elegida', sans-serif;
  --font-body: 'Otra Familia', sans-serif;
  
  /* Escalas y Espacios Generales */
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --radius-md: 8px;
  --transition-base: 300ms ease;
}
```

---

## 3. Estructura de Base de Datos y Seguridad (Supabase)

Debes estructurar y crear una base de datos PostgreSQL en Supabase, así como configurar políticas RLS (Row Level Security).

### 3.1. Entidades Clave (Ejemplo Adaptable)
Adapta estas entidades genéricas a la naturaleza del negocio (ej. Si es un restaurante, *"Proyectos"* se convierte en *"Platillos"*):

1. **Usuarios/Perfiles (`profiles`):** Extiende la tabla `auth.users` de Supabase para almacenar nombres y roles (Ej. `role: 'admin'`).
2. **Entidad Principal del Negocio (`items` / `projects` / `services`):** 
   - Almacena el contenido dinámico central.
   - Campos recomendados: `id` (UUID), `title`, `slug` (unique), `category`, `description` (texto), `main_image_url` (texto), `featured` (booleano).
3. **Galería Relacional (`item_images`):**
   - Tabla para soportar múltiples imágenes por cada Entidad Principal.
   - Campos: `id`, `item_id` (FK constraint a la Entidad Principal), `image_url`, `display_order`.
4. **Blog / Novedades (`posts`):**
   - Campos: `id`, `title`, `slug`, `content` (almacenará HTML crudo generado por Tiptap), `image_url`, `published_at`.

### 3.2. Reglas Row Level Security (RLS)
Para operar bajo un modelo Serverless y seguro directo desde React:
- **SELECT:** Cualquier usuario anónimo de internet puede leer la información de la Entidad Principal, Galerías y Blog. (`USING true`).
- **INSERT/UPDATE/DELETE:** Solo los usuarios cuya sesión cumpla la condición `auth.role() = 'authenticated'` pueden modificar las tablas. Debes aplicar lo mismo para el *Storage Bucket* público donde subas las imágenes.

---

## 4. Construcción del CMS (Panel Administrativo)

Al construir las pantallas del `/admin`, debes proveer las siguientes mecánicas:

### 4.1. Visualización y CRUD de Datos
- Las pantallas base (Ej. `ItemManager.jsx`) deben mostrar una tabla o listado de los registros actuales obtenidos vía `supabase.from('table').select()`.
- Deberá existir un botón "Nuevo" y botones para "Editar/Eliminar" por fila.
- Al editar o crear, despliega un formulario claro (idealmente en un entorno modal o página dedicada).

### 4.2. Carga y Gestión de Imágenes (Uploads)
- **Imagen Principal (Thumbnail):** Un input de archivo (`type="file"`) que inicie inmediatamente un upload asíncrono hacia `supabase.storage.from('bucket').upload()`, obtenga la URL pública (`getPublicUrl`) y la asigne al estado del formulario.
- **Galería Múltiple:** Implementa una zona *Drag & Drop* que permita subir múltiples archivos (`e.dataTransfer.files`) simultáneamente. Itera sobre ellos subiéndolos al bucket y guarda las URLs resultantes en el estado de una galería paralela, que al guardar en la base de datos se inserten como filas relacionales con un índice numérico en `display_order`.

### 4.3. Editor de Texto WYSIWYG Integrado
- En apartados donde se requiere escribir artículos libres (Como un Blog), implementa **Tiptap**.
- El contenido del editor debe mapearse y grabarse directamente como un bloque de HTML String puro crudo hacia Supabase (`<p>Hola <strong>mundo</strong></p>`).
- En el frontend público, dicho contenido deberá renderizarse utilizando `<div dangerouslySetInnerHTML={{ __html: post.content }} />`, aplicando reglas de seguridad o saneamiento si corresponde.

---

## 5. Criterios de Rendimiento y UX

Como agente constructor, asegúrate de que el código final tenga estas características:

- **Modularización Lógica:** Todo tu fetching de datos de Supabase en el frontend público puede encapsularse en un `useEffect` local con estado `loading`, mostrando un animado `<LoadingSpinner>` durante la transición. No renderices grids vacíos.
- **Tratamiento SEO:** Crea un Componente `<SEO title="..." description="..." />` que utilice React Helmet o simplemente el API del DOM (como `document.title` y `document.querySelector('meta[name="description"]')`) para actualizar asíncronamente las meta tags cuando el router cambie de página.
- **Archivos `netlify.toml` listos:** 
  Genera desde el inicio las directivas necesarias para evitar fallos 404 al recargar:
  ```toml
  [build]
    publish = "dist"
    command = "npm run build"
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

---

## Resumen Operativo para la IA:
Si el usuario te pide crear "*una web para una constructora con panel de clientes*", tú tomarás esta arquitectura, crearás la base en React + Vite + Vanilla CSS, estructurarás la base de datos Supabase con tablas (ej. `buildings`, `building_images`), e implementarás las interfaces públicas y privadas siguiendo la lógica de componentes detallada aquí. No deberás reinventar el proceso de autenticación o ruteo, utiliza el enfoque propuesto.
