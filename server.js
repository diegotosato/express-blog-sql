const express = require('express')
const app = express()
const PORT = 3000

//importo la middleware per gestire gli errori
const handleError = require('./middlewares/handleError')

//importo la middleware per gestire entrypoint inesistenti
const notFound = require('./middlewares/notFound')

const postsRouter = require('./routers/posts')

//imposto gli asset statici
app.use(express.static('public'))

//importo il body parser
app.use(express.json())



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    // diego.daje()
    res.send('Home Page')
})

//Resource: Posts
app.use('/api/posts', postsRouter)


//dichiaro la funzione per gestire gli errori a livello globale alla fine, dopo tutte le rotte
app.use(handleError)

//dichiaro la funzione per gestire gli entrypoint inesistenti a livello globale alla fine, dopo tutte le rotte
app.use(notFound)