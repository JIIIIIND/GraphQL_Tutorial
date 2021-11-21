# GraphQL_Tutorial
jandy14-GraphQL 튜토리얼 실습 프로젝트

## 실습 환경

Windows10 WSL2 Ubuntu20.04 LTS

node 10.19.0

npm 6.14.4

## 문제 수정

1. WSL2에서 Node를 설치하면 10.19.0 버전으로 설치가 되는데, 해당 버전으로 GraphQL 실습 예제를 실행하면 nodes.flatMap이 없다는 오류가 나옴 -> Node버전을 14.18.1로 업그레이드 하면 해당 오류가 해결됨
2. Error: Must Provide Document. -> apollo-server를 3버전으로 업그레이드 하면 해결됨


