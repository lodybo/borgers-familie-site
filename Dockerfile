FROM node:22-bullseye-slim

# set for base and all layer that inherit from it
ENV NODE_ENV=production

WORKDIR /borgers-site

ADD public /borgers-site/public
ADD build /borgers-site/build
ADD prisma /borgers-site/prisma
ADD node_modules /borgers-site/node_modules
ADD package.json /borgers-site/package.json

CMD ["npm", "start"]
