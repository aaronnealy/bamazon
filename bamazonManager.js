var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Dovedov9",
    database: "bamazonManager_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

  function start() {
      inquirer.prompt({
          name: "options",
          type: "list" ,
          message: "What would you like to do?",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
      })
      .then(function(answer){
          if (answer.options === "View Products for Sale"){
              viewProducts();
          }
          else if(answer.options === "View Low Inventory"){
              viewInventory();
          }
          else if(answer.options === "Add to Inventory"){
              addInventory();
          }
          else if(answer.options === "Add New Product"){
              addProduct();
          } else{
              connection.end();
          }

      });
  }

  function viewProducts(){
      //query database for viewing all items
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
      });      
  }

  