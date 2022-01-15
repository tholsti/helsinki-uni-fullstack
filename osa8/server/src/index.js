const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
} = require("apollo-server")
require("dotenv").config()
const mongoose = require("mongoose")
const Book = require("./model/book")
const Author = require("./model/author")
const typeDefs = require("./schema")
const User = require("./model/user")
const jwt = require("jsonwebtoken")

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message)
  })

const resolvers = {
  Author: {
    bookCount: async root =>
      await Book.find({ author: root._id }).countDocuments(),
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, { author: authorName, genre }) => {
      let author = authorName
        ? await Author.findOne({ name: authorName })
        : null

      const query = {
        ...(authorName ? { author } : {}),
        ...(genre ? { genres: { $in: genre } } : {}),
      }

      return await Book.find(query).populate("author")
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }
      const { author: authorName, ...rest } = args
      let author = await Author.findOne({ name: authorName })

      if (!author) {
        author = new Author({ name: authorName })
        try {
          await author.save()
        } catch (e) {
          throw new UserInputError(e, { invalidArgs: authorName })
        }
      }

      const book = new Book({ ...rest, author })
      try {
        await book.save()
      } catch (e) {
        throw new UserInputError(e, { invalidArgs: args })
      }
      return book
    },
    editAuthor: async (root, { name: authorName, setBornTo }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }
      const author = await Author.findOneAndUpdate(
        { name: authorName },
        { born: setBornTo },
        { new: true }
      )

      return author
    },
    createUser: async (root, args) => {
      const user = new User(args)
      try {
        await user.save()
      } catch (e) {
        throw new UserInputError(e, { invalidArgs: args })
      }
      return user
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      console.log("creds", username, password)

      if (!user || password !== "secret") {
        throw new Error("Wrong credentials")
      }

      return {
        value: jwt.sign({ username, id: user._id }, process.env.JWT_SECRET),
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
