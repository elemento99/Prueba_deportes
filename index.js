import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'

const __dirname = import.meta.dirname

const app = express()

// habilitar el req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// archivos estáticos (public)
app.use(express.static(__dirname + '/public'))


const pathFile = __dirname + "/data/deportes.json"


// READ
app.get('/deportes', async (req, res) => {
    try {
        const stringDeportes = await readFile(pathFile, 'utf8')
        const deportes = JSON.parse(stringDeportes)
        return res.json(deportes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

app.get('/deportes/create', async (req, res) => {
    try {
        const title = req.query.title;
        const precio = req.query.precio; 
        
        const newDeporte = {
            title: title,
            precio: precio,
            id: nanoid()
        };

        const stringDeportes = await readFile(pathFile, 'utf8');
        const deportes = JSON.parse(stringDeportes);

        deportes.push(newDeporte);

        await writeFile(pathFile, JSON.stringify(deportes));

        return res.json(deportes);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
});
// DELETE
app.get('/deportes/delete/:id', async (req, res) => {
    try {

        const id = req.params.id

        const stringDeportes = await readFile(pathFile, 'utf8');
        const deportes = JSON.parse(stringDeportes);

        const deporte = deportes.find(item => item.id === id)
        if (!deporte) {
            return res.status(404).json({ ok: false, msg: "deporte no encontrado" })
        }

        const newDeportes = deportes.filter((item) => item.id !== id)
        await writeFile(pathFile, JSON.stringify(newDeportes))
        return res.json(newDeportes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

// UPDATE
app.get('/deportes/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title = "", precio = "" } = req.query;

        const stringDeportes = await readFile(pathFile, 'utf8');
        let deportes = JSON.parse(stringDeportes);

        const index = deportes.findIndex(item => item.id === id);
        if (index === -1) {
            return res.status(404).json({ ok: false, msg: "Deporte no encontrado" });
        }

        deportes[index].title = title;
        deportes[index].precio = precio;

        await writeFile(pathFile, JSON.stringify(deportes));
        return res.json(deportes);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
});


const PORT = process.env.PORT || 3007
app.listen(PORT, () => console.log('server andando...'))