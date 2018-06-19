var Menupizzeria = require('./models/menupizzeria');
var Pizza = require('./models/pizza');
var Order = require('./models/order');
var Pizzeria = require('./models/pizzeria');
var User = require('./models/user');
var Rent = require('./models/rent');


/* INSERISCI PRESTITO */
app.post('/api/addRent', function(req, res) {
    console.log("Add rent");
    console.log(req.body);

    var newRent = new Rent(req.body);
    newRent.save(function(err, addedRent) {
        if (err) {
            console.log("Si è verificato un errore durante l'inserimento del prestito");
            res.send(err);
        }
        else {
            console.log("Rent added with success. Id : ");
            console.log(addedRent._id);
            io.emit("rentadded", addedRent);
            res.json({ message: 'Prestito inserito correttamente', "id": addedRent._id, "status": 1 })
        };
    });
});


/* RESTITUZIONE */
app.post('/api/giveBack', function(req, res) {
    console.log("Give back");
    console.log(req.body._id);

    var id = req.body._id;
    var restitutionTime = new Date();

    Rent.findById(id, function(err, r) {
        if(err) return res.send(err);
        else {
            var today = new Date();
            r.restitutionDate = today;
            r.save(function (err, rentUpdated) {
                if (err) res.send(err);
                else {
                    io.emit("rentgiveback", rentUpdated);
                    res.send({status: 1, success: true, updatedRent: rentUpdated, message: "Prestito chiuso!"});
                }
            });
        }
    });
});





/* LISTA DI TUTTI I PRESTITI */
app.get('/api/getRentList', function(req, res) {
    Rent.find(function(err, rentList) {
        if(err) res.send(err);
        
        rentList.sort(function(a, b) {
            a = new Date(a.from);
            b = new Date(b.to);
            return a>b ? -1 : a<b ? 1 : 0;
        });

        res.json(rentList);
    });
});





/* SOLLECITA RESTITUZIONE */
app.post('/api/hurry', function(req, res) {
    var rent = req.body;
    var notification = { "username" : rent.username, "message" : "Sollecito restituzione del libro " + rent.book.title};
    io.emit("rentnotification", notification);
    res.json({ message: 'Sollecito avvenuto correttamente' , status: 1});
});


/* ELIMINA PRESTITO */
app.delete('/api/deleteRent:idrent', function(req, res) {
    var id = req.params.idrent;
    Rent.remove({ "_id" : id }, function(err) {
        if (err) res.send(err);
        io.emit("rentdeleted", { "_id" : id });
        res.json({ message: 'Rent ' + req.params.idrent + ' removed' , status: 1});
    });
});









/* LISTA DI TUTTE LE PIZZE */
app.get('/api/getPizzaList', function(req, res) {
    //validate(req);
    Pizza.find(function(err, pizzaList) {
        if(err) res.send(err);
        res.json(pizzaList);
        });
});

/* AGGIUNTA NUOVA PIZZA */
app.post('/api/addPizza', function(req, res) {
    var newPizza = new Pizza(req.body);
    newPizza.save(function(err) {
        if (err) res.send(err);
        else {
                        io.emit("newpizza", newPizza);
                        res.json({ message: 'New pizza ' + req.body.name + ' added' , status: 1, newPizza: newPizza});
                    }
    });
});


/* CANCELLAZIONE PIZZA ESISTENTE */
app.delete('/api/deletePizza:pizza', function(req, res) {
    var pizzaToDelete = req.params.pizza;
    Pizza.remove({ "_id" : pizzaToDelete }, function(err) {
        if (err) res.send(err);
        res.json({ message: 'Pizza ' + req.params.pizza + ' removed' , status: 1});
    });
});





app.post('/api/addPizzeria', function(req, res) {
    var newPizzeria = new Pizzeria(req.body);
    newPizzeria.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'New pizzeria ' + req.body.name + ' added' , status: 1});
    });
});


app.get('/api/getPizzeriaList', function(req, res) {
    Pizzeria.find(function(err, pizzeriaList) {
        if(err) {
            console.log("Si è verificato un errore nella chiamata getPizzeriaList");
            res.send(err);
        } else {
            res.json(pizzeriaList);
        }

        });
});

app.get('/api/getPizzeriaNameList', function(req, res) {
    Pizzeria.find({}, "name", function(err, pizzeriaList) {
        if(err) {
            console.log("Si è verificato un errore nella chiamata getPizzeriaList");
            res.send(err);
        } else {
            res.json(pizzeriaList.map(function(p) { return {"_id" : p.id, "name" : p.name} }).filter(function(f) { return (f.name && f.name!=null)}));
        }

        });
});



/* ASSOCIA PIZZA A PIZZERIA */
app.post('/api/addPizzaToMenuPizzeria', function(req, res) {
    console.log("Add pizza to menu");
    console.log(req.body);
    var newAssociation = new Menupizzeria(req.body);
    newAssociation.save(function(err, addedAssociation) {
        if (err) {
            console.log("Si è verificato un errore durante l'inserimento di una pizza nel menu");
            res.send(err);
        }
        else {
            console.log("Pizza added with success. Association id : ");
            console.log(addedAssociation._id);
            res.json({ message: 'New pizza added to menu', "association": addedAssociation, "status": 1 })
        };
    });
});


app.get('/api/getCities', function(req, res) {
    Pizzeria.distinct("where.city" , function(err, resultList) {
        res.json(resultList);
    });
});


app.get('/api/getPizzeriaListByCity:city', function(req, res) {
    console.log("Chiamato il servizio getPizzeriaListByCity con parametro : " + req.params.city);
    Pizzeria.find({ "where.city" : req.params.city }, function(err, pizzeriaList) {
        if(err) {
                    console.log("si è verificato un errore durante la chiamata getPizzeriaListByCity");
                    console.log(err);
                    res.send(err);
        } else {

        res.json(pizzeriaList);
        }
        });
});

app.get('/api/getPizzeriaById:id', function(req, res) {
    console.log("Chiamato il servizio getPizzeriaById con parametro : " + req.params.id);
    Pizzeria.findOne({ "_id" : req.params.id }, function(err, pizzeria) {
        if(err) {
                    console.log("si è verificato un errore durante la chiamata getPizzeriaById");
                    console.log(err);
                    res.send(err);
        } else {

        res.json(pizzeria);
        }
        });
});





app.post('/api/updatePizzeria', function(req, res) {
 var updatedPizzeria = req.body.updatedPizzeria;
 console.log("Updating pizzeria : " + req.body.updatedPizzeria._id);
 Pizzeria.findById(updatedPizzeria._id, function (err, p) {
   if (err) return res.send(err);
   else {
       p.name = updatedPizzeria.name;
       p.phone = updatedPizzeria.phone;
       p.where.address = updatedPizzeria.where.address;
       p.where.city = updatedPizzeria.where.city;
       p.bigIncrease = updatedPizzeria.bigIncrease;
       p.smallReduction = updatedPizzeria.smallReduction;
       p.packageCost = updatedPizzeria.packageCost;
       p.deliveryCost = updatedPizzeria.deliveryCost;
       p.when.openingTime = updatedPizzeria.when.openingTime;
       p.when.closingTime = updatedPizzeria.when.closingTime;
       p.when.closureDat = updatedPizzeria.when.closureDay;

       p.save(function (err, pizzeriaUpdated) {
         if (err) res.send(err);
         else res.send({status: 1, success: true, updatedPizzeria: pizzeriaUpdated, message: "Pizzeria succefully updated!"});
       });
   }
 });
});






app.get('/api/getPizzeriaByName:name', function(req, res) {
    console.log("Chiamato il servizio getPizzeriaByName con parametro : " + req.params.name);
    Pizzeria.findOne({ "name" : req.params.name }, function(err, pizzeria) {
        if(err) {
                    console.log("si è verificato un errore durante la chiamata getPizzeriaByName");
                    console.log(err);
                    res.send(err);
        } else {

        res.json(pizzeria);
        }
        });
});


app.delete('/api/deletePizzeria:pizzeria', function(req, res) {
    var pizzeriaToDelete = req.params.pizzeria;
    Pizzeria.remove({ "name" : pizzeriaToDelete }, function(err) {
        if (err) res.send(err);
        res.json({ message: 'Pizzeria ' + req.params.pizzeria + ' removed' , status: 1});
    });
});



app.delete('/api/deleteFromMenu:ida', function(req, res) {
    var ida = req.params.ida;
    console.log("elimino associazione obsoleta con id : " + ida);
    Menupizzeria.remove({ "_id" : ida }, function(err) {
        if (err) res.send(err);
        res.json({ message: 'Pizza removed from pizzeria menu' , status: 1});
    });
});



app.get('/api/getMenupizzeriaByPizzeria:pizzeria', function(req, res) {
    Menupizzeria.aggregate([
        {
            $lookup:{
                from:"pizzas",
                localField:"pizza",
                foreignField:"_id",
                as:"pizzamenu"
            }
        }

    ], function(err, resultList) {
        res.json(resultList.filter(function(e) { return e.pizzeria == req.params.pizzeria; }));

    });



});


app.delete('/api/deleteOrders', function(req, res) {
    var idList = req.body.idList;
    console.log("Eliminazione degli ordini con id :");
    console.log(idList);
    Order.remove({ "_id" : {$in: idList} }, function(err) {
        if (err) res.send(err);
        else res.json({ message: 'Orders correctly removed' , status: 1});
    });
});



app.get('/api/getMenupizzeriaList:pizzeria', function(req, res) {
    Menupizzeria.find({"pizzeria": req.params.pizzeria}).populate('pizza pizzeria').exec(function(err, resultList) {
        res.json(resultList);
    });
});





var nTimes = 0;

var validateUser = function(req, res, username, next) {
  nTimes ++;
  console.log("Validate user chiamata per la " + nTimes + " volta");
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      var jwtSecretKey = app.get('jwtSecretKey');
    jwt.verify(token, jwtSecretKey, function(err, decoded) {
      if (err) {
                console.log("token non valido");
                console.log(err);
        return { status: false, decoded : "" };
      } else {
        // if everything is good, save to request for use in other routes
                console.log("token valido, decoded : ");
                console.log(decoded);
                if(decoded._doc.name == username) return next();
                else {
                    console.log("decoded._doc.name : " + decoded._doc.name + " non è uguale a username : " + username);
                    res.json({ status: 2, decoded : "", message: "Access denied" });
                }
                //return { status: true, decoded : decoded };
      }
    });

  } else {
        console.log("token non presente");
        res.json({ status: 3, decoded : "", message : "Token not found" });
    }
};




app.get('/api/getProtectedOrdersByPizzeria:pizzeria',function(req, res, next) {
    var pizzeria = req.params.pizzeria;
    console.log("req.params : ");
    console.log(req.params);
    return validateUser(req, res, pizzeria, next);
}, function(req, res) {

    var pizzeria = req.params.pizzeria;
    console.log("L'utente è stato validato, restituisco la lista ordini")

    Order.find( {"pizzeria":req.params.pizzeria}, function(err, orderList) {
        if(err) {
            console.log("Si è verificato un errore durante la chiamata a getOrdersByPizzeria");
            res.send(err);
        }

        else {
            console.log("Lista ordini per la pizzeria " + req.params.pizzeria);
            res.json(orderList);
        }
        });
});






app.get('/api/getOrdersByPizzeria:pizzeria', function(req, res) {
    Order.find( {"pizzeria":req.params.pizzeria}, function(err, orderList) {
        if(err) {
            console.log("Si è verificato un errore durante la chiamata a getOrdersByPizzeria");
            res.send(err);
        }

        else {
            console.log("Lista ordini per la pizzeria " + req.params.pizzeria);

    orderList.sort(function(a, b) {
        a = new Date(a.when.preferredTime);
        b = new Date(b.when.preferredTime);
        return a<b ? -1 : a>b ? 1 : 0;
    });

            res.json(orderList);
        }
        });
});



app.post('/api/sendOrder', function(req, res) {
    console.log(req.body);
    var newOrder = new Order(req.body);
    newOrder.save(function(err, addedOrder) {
        if (err) {
            console.log("Si è verificato un errore durante l'inserimento di un nuovo ordine");
            res.send(err);
        }
        else {
            console.log("Order added with success. Order id : ");
            console.log(addedOrder._id);
                            io.emit("neworder", newOrder);
            res.json({ message: 'New order added', "orderId": addedOrder._id, "status": 1 })
        };
    });
});





 app.post('/api/updatePizza', function(req, res) {
    var updatedPizza = req.body.updatedPizza;
    console.log("Updating pizza : " + req.body.updatedPizza._id);
    Pizza.findById(updatedPizza._id, function (err, p) {
      if (err) return res.send(err);
      else {
          console.log("no errori fin qui")
          p.name = updatedPizza.name;
          console.log("name updated");
          p.ingredients = updatedPizza.ingredients;
          console.log("ingredients updated");
          p.save(function (err, pizzaUpdated) {
            if (err) res.send(err);
            else res.send({status: 1, success: true, updatedPizza: pizzaUpdated, message: "Pizza succefully updated!"});
          });
      }
    });
});




app.post('/api/updatePizzamenuAvailability', function(req, res) {
    var associationId = req.body.associationId;
    var newState = req.body.newState;
    console.log("Updating pizza availability  : " + associationId);
    console.log(req.body.newState);
    Menupizzeria.findById(associationId, function (err, pizzamenu) {
      if (err) return handleError(err);
      else {
          if(pizzamenu && pizzamenu!=null) {
            pizzamenu["available"] = newState;
            console.log("sto per salvare pizzamenu : ");
              console.log(pizzamenu);

            pizzamenu.save(function (err, updatedPizzamenu) {
              if (err) return handleError(err);
              else {
                  res.send({status: 1, success: true, updatedPizzamenu: updatedPizzamenu, message: "Pizza availability succefully updated!"});
              }
            });
        }
      }
});
});


app.post('/api/updateOrderState', function(req, res) {
    var orderId = req.body.orderId;
    var newState = req.body.newState;
    var time = req.body.time;
    console.log("Updating order : " + orderId);
    console.log(req.body.newState);
    Order.findById(orderId, function (err, order) {
      if (err) return handleError(err);
      else {
          if(order && order!=null) {
            order.status.workingState = newState;
            if(newState=="accepted") io.emit("orderaccepted", {"message": time, "status":1});
            order.save(function (err, updatedOrder) {
              if (err) return handleError(err);
              else {
                  res.send({status: 1, success: true, updatedOrder: updatedOrder, message: "Order succefully updated!"});
              }
            });
        }
      }
});

//		var orderId = req.body.orderId;
//        Order.findOneAndUpdate({"_id" : orderId}, "accepted", {upsert:true}, function(err, doc){
//            if (err) return res.send(500, { error: err });
//            return res.send("succesfully saved");
//        });
});


app.post('/api/createUser', function(req, res) {
//					var newUser = new User({
//						 name: 'Unica',
//						 password: 'password',
//						 admin: true
//					 });
                var newUser = new User(req.body);
                newUser.save(function(err, addedUser) {
                if (err) {
                        console.log("Si è verificato un errore durante l'inserimento di un nuovo utente");
                        res.send(err);
                }
                else {
                    console.log('Utente aggiunto con successo');
                    res.json({ success: true });
                };
        });
});


app.post('/api/authenticate', function(req, res) {

    console.log("chiamato il servizio di autenticazione. req : ")
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

  User.findOne({
    "name": username
  }, function(err, user) {
    console.log("errore : ");
    console.log(err);
    console.log("user :");
    console.log(user);
        if (err) throw err;

        if (!user) {
              res.json({ success: false, message: 'Autenticazione fallita. Utente non trovato.' });
        } else if (user && !err) {

      user.comparePassword(password, function (err, isMatch) {
            if (isMatch && !err) {
                var token = jwt.sign(user, app.get('jwtSecretKey'), {
                  expiresIn: 500 // expires 5 minutes
                });
                res.json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token
                });
            } else {
               res.json({ success: false, message: 'Autenticazione fallita. Password errata.' });
            }
        });


    }

  });
});




var validateToken = function(req) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      var jwtSecretKey = app.get('jwtSecretKey');
    jwt.verify(token, jwtSecretKey, function(err, decoded) {
      if (err) {
                console.log("token non valido");
                console.log(err);
        return { status: false, decoded : "" };
      } else {
        // if everything is good, save to request for use in other routes
                console.log("token valido, decoded : ");
                console.log(decoded);
        return { status: true, decoded : decoded };
      }
    });

  } else {
        console.log("token non presente");
        return { status: false, decoded : "" };
    }
};