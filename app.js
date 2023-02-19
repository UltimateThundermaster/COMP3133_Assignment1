const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')

async function startServer() {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({app: app})

    mongoose.set('strictQuery', true)
    await mongoose.connect('mongodb+srv://ThunderMaster:usstabnyc@cluster0.phfivi1.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority')
    console.log('mongoose connected...')
    const port = 8000
    app.listen(port, () => console.log(`Server is up at port ${port}`))
}

startServer()