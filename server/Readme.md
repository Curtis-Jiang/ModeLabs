


npm install express @prisma/client cors dotenv
npm install -D typescript @types/node @types/express @types/cors prisma ts-node ts-node-dev

npm install @prisma/client
npm install prisma --save-dev

npx prisma init


npm install  
npm run dev

npm install
npx prisma generate
npx prisma migrate dev


# 评测所有模型
curl -X POST http://localhost:3001/api/evaluation/evaluate-all
# 评测单个模型
curl -X POST http://localhost:3001/api/evaluation/evaluate/{modelId}