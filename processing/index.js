const neo4j = require('neo4j-driver').v1;
const fs = require('fs');

const configFile = fs.readFileSync('config.json');
const config = JSON.parse(configFile);

const url = config.url;
const username = config.username;
const password = config.password;

console.log(config);

const driver = neo4j.driver(url, neo4j.auth.basic(username, password));
const session = driver.session();

// const resultPromise = session.run(
//     'create (a:Musician {name:$name}) return a',
//     {name: "Miles Davis"}
// );

// resultPromise.then(result => {
//     session.close();
//     driver.close();

//     console.log(result);
// });

session.close();
driver.close();