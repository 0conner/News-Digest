const {ApolloServer}=require("apollo-server");
let mysql=require("mysql");

let base=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Shashwat@2510"
});

base.connect(function(err){
  if (err) throw err;
  console.log("MySQL Connected");
});

base.query("USE test_data", function (err) {
  if (err) throw err;
  console.log("Database Connected");
});

const displayUser = (id) => {
  base.query(`SELECT * FROM user WHERE id = ${id}`, function (err, result) {
    if (err) throw err;
    console.log(err);
    console.log(result);
    ret = result;
  });
  return ret;
};

const addPhoto = (sql, id) => {
  base.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  return displayUser(id);
};


const resolvers = {
  Query: {
    getUserDetails: (parent, args) => displayUser(args.id),
  },
  Mutation: {
    addProfilePicture: (parent, args) => {
      let sql = `UPDATE user SET photo = '${args.photo}' WHERE id = ${args.id}`;
      return addPhoto(sql,args.id);
    },
  },
};


const fs = require("fs");
const path = require("path");

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));