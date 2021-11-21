const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const typeDefs = fs.readFileSync(
	path.join(__dirname, './schema.graphql'),
	'utf8'
);

const resolvers = {
	Query: {
		stores: (parent, args, context, info) => context.stores,
		store: (parent, args, context, info) => {
			return context.stores.find(element => element.id === args.id);
		},
		product: (parent, args, context, info) => {
			return context.products.find(element => element.id === args.id);
		},
		products: (parent, args, context, info) => context.products,
	},
	Mutation: {
		store: (parent, args, context, info) => {
			const item = {
				id: context.stores.length,
				title: args.title,
				description: args.description,
			}
			context.stores.push(item);
			return item
		},
		product: (parent, args, context, info) => {
			const item = {
				id: context.products.length,
				title: args.title,
				price: args.price,
				storeId: args.storeId,
			}
			context.products.push(item)
			return item
		}
	},
	Store: {
		products: (parent, args, context, info) => {
			return context.products.filter(element => element.storeId === parent.id);
		}				  
	},
	Product: {
		store: (parent, args, context, info) => {
			return context.stores.find(element => element.id === parent.storeId)
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		stores: [],
		products: []
	},
});

server
	.listen()
	.then(({ url }) =>
			console.log(`Server is running on ${url}`)
	);
