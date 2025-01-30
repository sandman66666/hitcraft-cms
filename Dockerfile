FROM public.ecr.aws/docker/library/node:20-alpine

WORKDIR /app

COPY . .

COPY package.json package-lock.json ./
RUN npm ci --platform=linux --arch=x64


EXPOSE 3000

# Development
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
