const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

/*
   gql 서버에 요청할 수 있는 스키마에 대한 정의
 */
const typeDefs = fs.readFileSync(
	path.join(__dirname, './schema.graphql'),
	'utf8'
)

/*
   타입에 대괄호를 씌워서 리스트 타입임을 나타냄
   ! 표시는 두군데 할 수 있으며, 위치에 따라 의미가 다름
   [Link]	리스트, 요소 Nullable
   [Link!]	리스트 Nullable, 요소 Non-Nullable
   [Link]!	리스트 Non-Nullable, 요소 Nullable
   [Link!]!	리스트, 요소 Non-Nullable
 */
let linkValues = [{
	id: 'link-0',
	url: 'www.howtographql.com',
	description: 'Fullstack tutorial for GraphQL'
}]

/*
   typeDefs에 정의한 내용을 어떻게 찾는지 알려줌
   ex) 위의 info는 String!를 가지는데, resolvers에서 'this is info api'라는 값이라고 정의함
   info를 요청하면 해당 함수를 호출해 반환해줌

   단순히 parent에서 동명의 필드 값을 반환하는 리졸버는 생략이 가능함(id, url, description)i
 */
const resolvers = {
	Query: {
		info: () => `this is info api`,
		feed: () => linkValues,
	},
	Link: {
		urlLength: (parent) => parent.url.length,
		shortDescription: (parent) => parent.description.substring(0, 5),
	},
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

