# base node image
FROM node:18-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /borgers-site

ADD package.json package-lock.json .npmrc ./
RUN npm install --include=dev

# Setup production node_modules
FROM base as production-deps

WORKDIR /borgers-site

COPY --from=deps /borgers-site/node_modules /borgers-site/node_modules
ADD package.json package-lock.json .npmrc ./
RUN npm prune --omit=dev

# Build the app
FROM base as build

WORKDIR /borgers-site

COPY --from=deps /borgers-site/node_modules /borgers-site/node_modules

ADD prisma .
RUN npx prisma generate

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /borgers-site

COPY --from=production-deps /borgers-site/node_modules /borgers-site/node_modules
COPY --from=build /borgers-site/node_modules/.prisma /borgers-site/node_modules/.prisma

COPY --from=build /borgers-site/build /borgers-site/build
COPY --from=build /borgers-site/public /borgers-site/public
ADD . .

CMD ["npm", "start"]
