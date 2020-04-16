const fs = require("fs");
const { readFile, produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    return Promise.all([
      readFile("./data/products.json"),
      readFile("./data/reviews.json"),
      readFile("./data/users.json"),
    ]).then((files) => {
      const products = JSON.parse(files[0]);
      const reviews = JSON.parse(files[1]);
      const users = JSON.parse(files[2]);

      const data = {};
      data.products = products;
      data.reviews = reviews;
      data.users = users;
      return produceResult(data);
    });
  }

  async buildReviewsAsyncAwait() {
    const products = await readFile("./data/products.json");
    const reviews = await readFile("./data/reviews.json");
    const users = await readFile("./data/users.json");

    const JSONproducts = JSON.parse(products);
    const JSONreviews = JSON.parse(reviews);
    const JSONusers = JSON.parse(users);

    const data = {};
    data.products = JSONproducts;
    data.reviews = JSONreviews;
    data.users = JSONusers;

    return produceResult(data);
  }
}

module.exports = ReviewBuilder;
