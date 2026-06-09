# Delegación Ingeniería Informática UNT — PERUMEC 2026 Cusco
Landing page informativa para la delegación. HTML, CSS y JS puro.

---

## Estructura de archivos

```
/
├── index.html
├── styles.css
├── script.js
└── /assets
    ├── logo-perumec.png       ← Logo oficial PERUMEC 2026
    ├── logo-unt.png           ← Logo UNT
    ├── logo-ing-informatica.png ← Logo Ingeniería Informática UNT
    ├── logo-cefinf.png        ← Logo CEFINF
    ├── logo-incuba-unt.png    ← Logo INCUBA UNT
    ├── cusco.jpg              ← Foto real de Cusco (Plaza de Armas u otro)
    ├── unsaac.jpg             ← Foto de la UNSAAC
    ├── congreso.jpg           ← Foto de congreso o auditorio (opcional)
    ├── estudiantes.jpg        ← Foto de estudiantes (opcional)
    └── og-image.jpg           ← Imagen de preview para WhatsApp (1200×630px)
```

---

## Cómo cambiar los links

### En `script.js` (líneas ~10–16)
```js
const CONFIG = {
  WHATSAPP_URL:    'https://wa.me/51999999999?text=Hola, quiero info sobre PERUMEC 2026',
  GOOGLE_DRIVE_URL:'https://drive.google.com/drive/folders/XXXXX',
  FORMULARIO_URL:  'https://forms.gle/XXXXX',
  LINK_WEB:        'https://perumec-unt.vercel.app',
};
```

### En `index.html`
Busca con Ctrl+F los textos:
- `WHATSAPP_URL_AQUI` → reemplaza con el link de WhatsApp
- `GOOGLE_DRIVE_URL_AQUI` → reemplaza con el link del Drive
- `FORMULARIO_URL_AQUI` → reemplaza con el formulario de inscripción
- `LINK_WEB_AQUI` → reemplaza con la URL final de Vercel

---

## Cómo colocar los logos

1. Crea la carpeta `/assets` en la raíz del proyecto
2. Guarda cada logo con el nombre exacto que aparece arriba
3. Formatos recomendados: PNG con fondo transparente para logos
4. Tamaños recomendados:
   - Logo PERUMEC: ancho máx 200px
   - Logo UNT e Informática: ancho máx 180px
   - OG Image: exactamente 1200×630px

Las imágenes de Cusco deben ser horizontales (relación 4:3 o 16:9).

---

## Cómo desplegar en Vercel

### Opción A — Arrastrar y soltar (más fácil)
1. Ve a https://vercel.com y crea una cuenta (gratis)
2. Haz clic en "Add New Project"
3. Elige "Browse" y sube la carpeta del proyecto completa
4. Vercel detecta que es un sitio estático automáticamente
5. Haz clic en "Deploy"
6. Copia la URL que te da Vercel y úsala en `LINK_WEB_AQUI`

### Opción B — Con GitHub (recomendado para actualizaciones)
1. Sube el proyecto a un repositorio GitHub
2. Ve a https://vercel.com → "Add New Project" → conecta GitHub
3. Selecciona el repositorio
4. Vercel despliega automáticamente cada vez que haces push

### Variables de entorno
No se necesitan. Es un sitio estático puro.

---

## Notas

- El sitio funciona abriendo `index.html` directamente en el navegador (sin servidor).
- Mobile-first: diseñado para verse bien en celular desde el inicio.
- Todas las imágenes tienen fallback: si no existen, el layout no se rompe.
- Los contadores animados se activan al hacer scroll hasta la sección de métricas.
