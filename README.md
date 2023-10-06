## Angular
npm install -D @nrwl/angular
yarn add -W @angular/material && yarn nx g @angular/material:ng-add
npm install -D tailwindcss --force
npm install -D postcss -force

## Nestjs

## Run Remote
"start": "node dist/main.js",

## Git CLI
git remote prune origin "Đồng Bộ Nhánh Trên máy Chủ"
git push origin --delete  xóa nhánh remote
git branch -D xóa nhánh local
## Workspace CLI
npx nx g @nrwl/workspace:remove hrm
npx nx run-many --target=serve --projects=app1,app2 --parallel
npx nx run-many --target=build --projects=app1,app2 --parallel

### Buid
npx nx build app1 --prod --outputHashing=all

## Github Action
git branch gh-pages

git checkout gh-pages

git push origin gh-pages

npx ng add angular-cli-ghpages

npx ng deploy --base-href=https://quocbao1983.github.io/demo/

npx ng build --prod --base-href https://quocbao1983.github.io/demo/

npx ng add angular-cli-ghpages --project site

npx ngh --dir=dist/apps/site  --no-silent

git config --global user.email "quocbao280783@gmail.com"

git config --global user.name "quocbao1983"

npx nx build --prod --outputHashing=all

### Docker BackEnd End
#### create and add to .dockerignore
Dockerfile

.dockerignore

node_modules
 
npm-debug.log
#### create and add to Dockerfile

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

CMD [ "node", "dist/apps/api/main.js" ]

docker build -t demoapi .

After Deploy Get Link API and repalce APIURL
### Docker Front End
#### create and add to .dockerignore
Dockerfile

.dockerignore

node_modules
 
npm-debug.log
#### create and add to Dockerfile

FROM nginx:1.17.1-alpine

COPY /dist/apps/site /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 4200

docker build -t demosite .

docker build -t anhsonsite .
docker tag anhsonsite gcr.io/alert-rush-279906/anhsonsite
docker push gcr.io/alert-rush-279906/anhsonsite