<<<<<<< HEAD
# Sustainable Luxury - Web Application

Una plataforma educativa de lujo sostenible construida con React, Vite y Tailwind CSS.

## 📁 Estructura del Proyecto

```
Luxury/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes UI de shadcn/ui (48 componentes)
│   │   ├── HeroSection.jsx
│   │   ├── CTASection.jsx
│   │   ├── ImpactSection.jsx
│   │   ├── PathwaysSection.jsx
│   │   └── ValueProposition.jsx
│   ├── pages/               # Páginas de la aplicación (15 páginas)
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   ├── Programs.jsx
│   │   ├── Resources.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.jsx       # Layout principal con navegación y footer
│   ├── api/
│   │   └── mockClient.js    # Cliente API mock para Base44
│   ├── data/
│   │   └── mockData.js      # Datos de prueba
│   ├── hooks/
│   │   └── use-toast.js     # Hook personalizado para toasts
│   ├── lib/
│   │   └── utils.js         # Utilidades (cn, etc.)
│   ├── errors/
│   │   └── UserNotRegisteredError.jsx
│   ├── App.jsx              # Configuración de rutas
│   ├── main.jsx             # Punto de entrada
│   ├── index.css            # Estilos globales
│   └── utils.js             # Utilidades de routing
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── .gitignore
```

## 🚀 Instalación Local

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Instalar dependencias**:
   ```bash
   cd C:\Users\perez\n8n\Luxury
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:5173`

3. **Build de producción**:
   ```bash
   npm run build
   ```

4. **Preview del build**:
   ```bash
   npm run preview
   ```

## 📤 Subir a GitHub

### Opción 1: Usando GitHub Desktop (Recomendado si no tienes Git)

1. Descarga e instala [GitHub Desktop](https://desktop.github.com/)
2. Abre GitHub Desktop
3. Click en "File" → "Add Local Repository"
4. Selecciona la carpeta `C:\Users\perez\n8n\Luxury`
5. Click en "Create Repository" si no está inicializado
6. Escribe un mensaje de commit: "Restructured project for Vercel deployment"
7. Click en "Commit to main"
8. Click en "Publish repository"
9. Selecciona tu cuenta (PabloVisualGrowth)
10. Asegúrate de que el nombre sea "Luxury"
11. Marca como "Public" si quieres que sea público
12. Click en "Publish Repository"

### Opción 2: Usando Git por línea de comandos

Si instalas Git, ejecuta estos comandos:

```bash
cd C:\Users\perez\n8n\Luxury

# Inicializar repositorio
git init

# Añadir todos los archivos
git add .

# Hacer commit
git commit -m "Restructured project for Vercel deployment"

# Conectar con el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/PabloVisualGrowth/Luxury.git

# Forzar push (esto sobrescribirá el repositorio actual)
git push -f origin main
```

## 🌐 Desplegar en Vercel

### Método 1: Desde la Web de Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en "Add New" → "Project"
3. Importa tu repositorio de GitHub "PabloVisualGrowth/Luxury"
4. Vercel detectará automáticamente que es un proyecto Vite
5. Configuración (debería ser automática):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click en "Deploy"
7. ¡Espera a que termine el deployment!

### Método 2: Usando Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desde la carpeta del proyecto
cd C:\Users\perez\n8n\Luxury

# Deploy
vercel

# Para producción
vercel --prod
```

## 🔧 Tecnologías Utilizadas

- **React 18** - Librería UI
- **Vite 5** - Build tool y dev server
- **React Router DOM 6** - Routing
- **Tailwind CSS 3** - Estilos
- **shadcn/ui** - Componentes UI
- **Radix UI** - Componentes primitivos accesibles
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **TanStack Query** - Gestión de estado del servidor

## 📝 Notas Importantes

- El proyecto usa **alias de path** (`@/`) que apunta a `./src/`
- Todos los componentes UI están en `src/components/ui/`
- El Layout incluye navegación responsive y footer
- La aplicación está configurada para trabajar con Base44 (mock client incluido)

## 🐛 Solución de Problemas

### Error: "Cannot find module '@/...'"
- Asegúrate de que `vite.config.js` tiene la configuración de alias correcta
- Reinicia el servidor de desarrollo

### Error en el build
- Verifica que todas las dependencias estén instaladas: `npm install`
- Limpia la caché: `rm -rf node_modules dist` y reinstala

### La página no carga en Vercel
- Verifica que el `vercel.json` esté en la raíz del proyecto
- Asegúrate de que el build se completó sin errores en el dashboard de Vercel

## 📧 Contacto

Catherine Sonolet - catherine.sonolet@sustainable-luxury.info

---

**¡Proyecto reestructurado y listo para deployment! 🎉**
=======
# Luxury
>>>>>>> 985b8ccea093af3b58a38ffbd96b7662541c1ecb
