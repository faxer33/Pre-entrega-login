const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Puedes cambiar el puerto según tus necesidades

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

// Define las rutas y lógica para el login, registro, productos, etc.
// Asegúrate de tener las vistas y controladores adecuados.

// Ruta de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Realiza la autenticación aquí (comparando con la base de datos, por ejemplo)

    // Si la autenticación es exitosa, establece la sesión y redirige a la vista de productos
    req.session.user = { email, role: email === 'adminCoder@coder.com' ? 'admin' : 'usuario' };
    res.redirect('/productos');
});

// Ruta de productos
app.get('/productos', (req, res) => {
    // Verifica si el usuario está autenticado antes de mostrar la vista de productos
    if (req.session.user) {
        const { email, role } = req.session.user;
        res.send(`Bienvenido ${email}. Rol: ${role}. Vista de productos.`);
    } else {
        res.redirect('/login');
    }
});

// Ruta de logout
app.get('/logout', (req, res) => {
    // Destruye la sesión y redirige a la vista de login
    req.session.destroy();
    res.redirect('/login');
});

// Puedes agregar más rutas según tus necesidades

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
