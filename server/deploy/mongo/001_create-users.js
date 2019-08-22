// eslint-disable-next-line no-undef
db.createUser({
  user: "admin",
  pwd: "secretstuff",
  roles: [
    {
      role: "readWrite",
      db: "database"
    }
  ]
});
