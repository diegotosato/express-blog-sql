//importo il menu
const { error } = require('console')

//preparo tutte le funzioni

//index (.get)
function index(req, res) {

    // console.log(req.query.tipo_piatto);

    //Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag

    //racchiudo la mia chiave della query string in una variabile
    const plateType = req.query.piatto
    // console.log(plateType);

    //variabile per il menu filtrato (valore di partenza menu così mi restituisce tutto l'array se non trova elementi da filtrare)
    let filteredMenu = menu

    //se il valore della mia query esite, allora filtro l'array di partenza, e restituisco gli oggetti che contengono il mio valore
    if (req.query.piatto) {
        // console.log('ho trovato il tuo ingrediente');
        filteredMenu = menu.filter(item => item.tags.includes(plateType))
        console.log(filteredMenu);

    }

    res.json(filteredMenu)
}





//show (.get)
function show(req, res) {
    //converto l'ID in numero
    const id = Number(req.params.id)

    //filtro il menu ed estraggo il sinoglo post il cui id è uguale ad id
    const findPost = menu.find(post => post.id === id)

    //restituisco in formato json il post trovato
    // res.json(findPost)

    //se il post non esiste, allora setto lo status su 404 (not found), e restituisco un oggetto che contiene status, errore e un messaggio
    if (!findPost) {
        res.sendStatus(404)

        return res.json({
            status: 404,
            error: 'Not found',
            message: 'Il post non esiste'
        })
    }

    res.json(findPost)
}






//store (.post)
function store(req, res) {

    //recupero i dati in entrata parsati in server.js in fromato json
    const postData = req.body
    //log in console dei dati in entrata
    console.log(postData);

    //creo un nuovo id dinamico che si adatta alla lunghezza dell'array
    const newID = menu[menu.length - 1].id + 1

    //creo la struttura del nuovo oggetto che sta entrando e assegno i singoli valori
    const newPost = {
        id: newID,
        title: postData.title,
        content: postData.content,
        image: postData.image,
        tags: postData.tags
    }

    //pusho nell'array il nuovo oggetto
    menu.push(newPost)

    //setto lo status della chiamata, indicando che la richiesta HTTP ha portato alla creazione di una nuova risorsa sul server
    res.status(201)

    //restituisco in formato json il nuovo oggetto
    res.json(newPost)
}






//update (.put)
function update(req, res) {
    //converto l'ID in numero
    const id = Number(req.params.id)

    //recupero i dati in entrata parsati in server.js in formato json
    const updateData = req.body

    //filtro il menu ed estraggo il singolo post il cui id è uguale ad id
    const findPost = menu.find(post => post.id === id)

    //se il post non esiste, allora setto lo status su 404 (not found), e restituisco un oggetto che contiene status, errore e un messaggio
    if (!findPost) {
        res.sendStatus(404)

        return res.json({
            status: 404,
            error: 'Not found',
            message: 'Il post non esiste'
        })
    }

    //ogni chiave dell'oggetto viene aggiornata con i dati in entrata
    findPost.id = id,
        findPost.title = updateData.title,
        findPost.content = updateData.content,
        findPost.image = updateData.image,
        findPost.tags = updateData.tags

    //restituisco l'oggetto aggiornato
    res.json(findPost)
}






//modify (.patch)
function modify(req, res) {
    res.send(`Modifica PARZIALMENTE il post con id: ${req.params.id}`)
}






//destroy (.delete)
function destroy(req, res) {
    //converto l'ID in numero
    const id = Number(req.params.id)

    //filtro il menu ed estraggo il sinoglo post il cui id è uguale ad id
    const deletePost = menu.find(post => post.id === id)

    //se il post non esiste, allora setto lo status su 404 (not found), e restituisco un oggetto che contiene status, errore e un messaggio
    if (!deletePost) {
        res.sendStatus(404)

        return res.json({
            status: 404,
            error: 'Not found',
            message: 'Il post non esiste'
        })
    }

    //metodo splice per rimuovere il post desiderato
    //recupero la posizione nell'array del post da eliminare, dichiaro dopo la virgola quanti elementi rimuovere
    menu.splice(menu.indexOf(deletePost), 1);

    //loggo in console l'array aggiornato
    console.log(menu);

    //rispondo on un errore 204 per indicare che la cancellazione sia avvenuta con successo
    res.sendStatus(204)

}

module.exports = { index, show, store, update, modify, destroy }