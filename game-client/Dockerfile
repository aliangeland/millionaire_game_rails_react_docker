FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN chown -Rh $user:$user ./
USER $user

RUN npm install --silentdo
RUN npm config set unsafe-perm true
RUN npm install react-scripts@latest -g --silent

COPY . ./

COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "start"]

