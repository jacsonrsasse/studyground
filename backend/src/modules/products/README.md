# Products Module

This module is about a test using a cursor to paginate through all products in the database, process them in batches of 10, transform some data, and return as Stream

## How to use

First, to test this module you'll need a postgres database with a big amount of products. You can use the docker-compose file in the root of the project to create a postgres database. After that, require the route `/make/moke/products/seed` to create the table and insert 10000 products.

With the database ready, you can use the route `/products` to get all products by stream. Make sure your front end is able to handle the stream. Here is an example:

```
const response = await fetch('/stream');
const reader = response.body.getReader();

let result = '';
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  result += new TextDecoder().decode(value);
  console.log('Chunk recebido:', result);
}
```
