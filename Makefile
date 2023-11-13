install:
	cd client/ && npm install
	cd ./assistant-api/ && npm install
	cd ./code-api/ && npm install
	cd ./collaboration-api/ && npm install
	cd ./question-api/ && npm install
	cd ./user-api/
	conda create --name user-api python=3.9

dev:
	docker-compose up

down:
	docker-compose down