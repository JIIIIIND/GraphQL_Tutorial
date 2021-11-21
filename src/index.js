const { ApolloServer } = require('apollo-server');

/*
   gql 서버에 요청할 수 있는 스키마에 대한 정의
   String 뒤의 !는 Non-Nullable을 의미함
 */
const typeDefs = `
	type Query {
		info: String!
	}
`
/*
   typeDefs에 정의한 내용을 어떻게 찾는지 알려줌
   ex) 위의 info는 String!를 가지는데, resolvers에서 'this is info api'라는 값이라고 정의함
   info를 요청하면 해당 함수를 호출해 반환해줌
 */
const resolvers = {
	Query: {
		info: () => `this is info api`
	}
}

/*
   스키마와 리졸버를 ApolloServer에 전달
   스키마와 리졸버 외에도 지정할 수 있는 값 있음
   gql에선 요청에 대한 반환 타입을 정의하는 스키마와 해당 내용을 어떻게 찾는지 정의하는 리졸버가 핵심
 */
const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server
	.listen()
	.then(({ url }) =>
			console.log(`Server is running on ${url}`)
	);

