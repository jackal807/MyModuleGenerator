module.exports = function(app, io, jwt, cheerio, fs, request) {

	var mongoose       = require('mongoose');
    var dbconnection = mongoose.connection;
    

    var project_base_url = "C:/Users/DANIELE-PC/git/mysaas/MySaas";
    var project_webapp_url = "mysaas-webapp";
    var project_core_url = "mysaas-core";

    /* HTML */
    var view_base_url ="src/main/webapp/backoffice/v2/angular-resources";

    var controllersTemplatePath = "mymodulegenerator_resources/controller_template.txt";
    
    /* CSS */

    /* JS */

    /* VELOCITY */

    /* JAVA */

    var log = (msg, title) => {
        //aggiungere eventualmente la generazione notifiche
        console.log(msg);
    };

    var getViewsUrl = () => {
        return project_base_url + "/" + project_webapp_url + "/" + view_base_url + "/";
    }


    var generateControllers = (module, arr_submodules) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];

        let moduleNameCamel = module.name;

        let moduleNameCamelRegex = new RegExp("##module_name_camel##", 'g')
        let submoduleNameCamelRegex = new RegExp("##submodule_name_camel##", 'g')

        let controllersPath = getViewsUrl() + moduleNameCamel.toLowerCase();
        if(!fs.existsSync(controllersPath)) fs.mkdirSync(controllersPath);

        //lettura del template per i controllers
        fs.readFile(controllersTemplatePath, 'utf8',function read(err, data) {
            if (err)  {
                log("Errore durante la lettura del file ")
                Promise.reject(err);
            } else {
                for(let i=0; i<arr_submodules.length; i++) {
                    let submoduleName = arr_submodules[i].name;
                    let templateBodyTemp = data.replace(submoduleNameCamelRegex, submoduleName).replace(moduleNameCamelRegex, moduleNameCamel);
                    let submoduleControllerFilePath = controllersPath + "/" + submoduleName + "Ctrl" + ".js" 
                    textToFile(templateBodyTemp, submoduleControllerFilePath, false);
                }
            }
        });
    }


    app.get('/api/generatetemplates', function(req, res){ 
        
        let modulea = {
            "name" : "MioPrimoModulo",
            "dependencies" : []
        };

        let submodules = [{
            "name" : "MioPrimoSubModulo",
            "dependencies" : []
        }, {
            "name" : "MioSecondoSubModulo",
            "dependencies" : ["blabla"]
        }];

        generateControllers(modulea, submodules);

    });
















    /* ACTION ROUTES */

   


    var insertAllBrands = function() {
        for(var i=1; i<12; i++) {
            fs.readFile('brands-new-' + i + '.json', 'utf8',function read(err, data) {
                if (err) {
                    console.log(err);
                }
                console.log("Nessun errore");
                var content = JSON.parse(data);
                for(var j=0; j<content.length; j++) {
                    console.log("scrivo content[" + j + "]");
                    console.log(content[j]);
                    //insertSingleBrand(content[j]);
                }
            });
        }
    }

        /* UTILITIES */

        var removeDuplicates = function(arr, attr) {
            let res = arr.filter((el, index, self) =>
            index === self.findIndex((t) => (
              t[attr] === el[attr]
            ))
          );
          return res;
        }

        var fileToJson = function(fileName) {
            let p = new Promise(function(resolve, reject){
                fs.readFile(fileName, 'utf8',function read(err, data) {
                    if (err)  reject(err);
                    resolve(JSON.parse(data));
                });
            });
            return p;
        }


        var textToFile = function(text, fileName, isJson) {
            let ttw = isJson ? JSON.stringify(text, null, 4) : text;
            let p = new Promise(function(resolve, reject){
                fs.writeFile(fileName, ttw,function (err) {
                    if (err)  reject(err);
                    resolve();
                });
            });
            return p;
        }


        app.get('/api/testfileread', function(req, res){ 
               /*
                fileToJson("perfumesNew.json").then(
                 
                function(success, err) {
                    if(err) console.log("Errore");
                    else {
                        console.log("Lettura completata con successo, risultato : ");
                        console.log(success);
                        res.json(success);
                    }
                });

                */
        });



	app.get('*', function(req, res) {
			res.sendfile('./public/mymodulegenerator/www/index.html');
	});

};
