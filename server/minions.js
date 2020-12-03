const minionsRouter = require('express').Router()

module.exports = minionsRouter

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db')

// minions params
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id)
    if(minion) {
        req.minion = minion
        next()
    } else {
        res.status(404).send()
    }
})

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
})

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    res.status(201).send(newMinion)
})

// get the minion id based on params
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion)
})


minionsRouter.put('/:minionId', (req, res, next) =>{
    const minionUpdate = updateInstanceInDatabase('minions', req.body)
    res.send(minionUpdate)
})


minionsRouter.delete('/:minionId', (req, res, next) =>{
    const minionDelete = deleteFromDatabasebyId('minions', req.params.minionId)
    if (minionDelete) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send()
})


// Get work based on the minionId
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.miinionId === req.params.miinionId
    })
    res.send(work)
})

minionsRouter.post('/:minionId/work', (req, res, next) =>{
    const workToAdd = req.body
    workToAdd.miinionId = req.params.miinionId
    const createdWork = addToDatabase('work', workToAdd)
    res.status(201).send(createdWork)
})


//minion params
minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id)
    if(work) {
        req.work = work
        next()
    } else {
        res.status(404).send()
    }
})

minionsRouter.put('/:minionId/work/:workId', (req, res, next) =>{
    if(req.params.miinionId !== req.body.miinionId) {
        res.status(400).send()
    } else {
        updatedWork = updateInstanceInDatabase('work', req.body)
        res.send(updatedWork)
    }
})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) =>{
    const workToDelete = deleteFromDatabasebyId('work', req.params.workId)
    if (workToDelete) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send()
})