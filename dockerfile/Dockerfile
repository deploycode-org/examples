# A Dockerfile at the root of the service's path is used instead of Railpack, the way Railway
# does it. Keep the exact name: the platform looks for `Dockerfile`, not `dockerfile`.
FROM node:22-alpine

WORKDIR /app

# A service variable used at build time arrives as a build argument; only an ARG takes it in.
ARG BUILD_MESSAGE="not set"
RUN echo "$BUILD_MESSAGE" > build-message.txt

# Tells the page this image came from this file and not from Railpack.
ENV BUILT_WITH=Dockerfile

COPY package.json server.js ./

# The platform's default port for the address. The server listens here and ignores PORT.
EXPOSE 8080

CMD ["node", "server.js"]
