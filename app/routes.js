module.exports = function(app, io, jwt, cheerio, fs, request) {

	var mongoose       = require('mongoose');
    var dbconnection = mongoose.connection;
    

    var project_base_url = "C:/Users/DANIELE-PC/git/mysaas/MySaas";
    var project_webapp_url = "mysaas-webapp";
    var project_core_url = "mysaas-core";

    /* HTML */
    var view_base_url ="src/main/webapp/backoffice/v2/angular-resources";
    var viewsTemplatePath = "mymodulegenerator_resources/view_template.txt";
   
    
    /* CSS */

    /* JS */
    var js_base_url ="src/main/webapp/backoffice/v2/js/angular";
    var controllersTemplatePath = "mymodulegenerator_resources/controller_template.txt";
    var servicesTemplatePath = "mymodulegenerator_resources/service_template.txt";

    /* VELOCITY */

    /* JAVA */

    var log = (msg, title) => {
        //aggiungere eventualmente la generazione notifiche
        console.log(msg);
    };

    var getViewsUrl = () => {
        return project_base_url + "/" + project_webapp_url + "/" + view_base_url + "/";
    }

    var getJsUrl = () => {
        return project_base_url + "/" + project_webapp_url + "/" + js_base_url + "/";
    }


    var camelToDelimiter = (camel) => {
        camel = camel.split("");
        if(camel.length<2) return camel;
          camel[0] = camel[0].toLowerCase();
          for(var i=1;i<camel.length; i++) {
              if(camel[i] === camel[i].toUpperCase()) {
                  camel.splice(i, 1, ("-" + camel[i].toLowerCase()));
              }
          }
          return camel.join("");
      }


    var moduleNameToFolderName = (moduleNameCamel) => {
        return camelToDelimiter(moduleNameCamel.toLowerCase());
    }

    

    var createDirList = (dirList) => {
        for(let i=0; i<dirList.length; i++) 
            if(!fs.existsSync(dirList[i])) fs.mkdirSync(dirList[i]);
    }


    var generateJsFolders = (moduleNameCamel) => {
        let jsUrl = getJsUrl();
        let moduleJsUrl = jsUrl + "/" + moduleNameToFolderName(moduleNameCamel);
        let controllersDirPath = moduleJsUrl + "/controllers";
        let servicesDirPath = moduleJsUrl + "/services";
        let directivesDirPath = moduleJsUrl + "/directives";
        let filtersDirPath = moduleJsUrl + "/filters";
        let confDirPath = moduleJsUrl + "/conf";

        createDirList([moduleJsUrl, controllersDirPath, servicesDirPath, directivesDirPath, filtersDirPath, confDirPath]);
    }


    var generateHtmlFolders = (moduleNameCamel) => {
        let htmlUrl = getViewsUrl();
        let moduleHtmlUrl = htmlUrl + "/" + moduleNameToFolderName(moduleNameCamel);
        let directivesDirPath = moduleHtmlUrl + "/directives";
        let modalsDirPath = moduleHtmlUrl + "/modals";
        let viewsDirPath = moduleHtmlUrl + "/views";
        let partialsDirPath = viewsDirPath + "/partials";

        createDirList([moduleHtmlUrl, directivesDirPath, modalsDirPath, viewsDirPath, partialsDirPath]);
    }








    var generateViews = (module, arr_submodules) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];

        let moduleNameCamel = module.name;

        let submoduleNameRegex = new RegExp("##submodule_name##", 'g')

        let viewsPath = getViewsUrl() + "/" + moduleNameToFolderName(module.name) + "/views";
        if(!fs.existsSync(viewsPath)) fs.mkdirSync(viewsPath);

        //lettura del template per le views
        fs.readFile(viewsTemplatePath, 'utf8',function read(err, data) {
            if (err)  {
                log("Errore durante la lettura del file : " + viewsTemplatePath);
                Promise.reject(err);
            } else {
                for(let i=0; i<arr_submodules.length; i++) {
                    let submoduleName = arr_submodules[i].name;
                    let templateBodyTemp = data.replace(submoduleNameRegex, camelToDelimiter(submoduleName));
                    let submoduleViewFilePath = viewsPath + "/" + camelToDelimiter(submoduleName) + ".html" ;
                    textToFile(templateBodyTemp, submoduleViewFilePath, false);
                }
            }
        });
    }







    var generateControllers = (module, arr_submodules) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];

        let moduleNameCamel = module.name;

        let moduleNameCamelRegex = new RegExp("##module_name_camel##", 'g')
        let submoduleNameCamelRegex = new RegExp("##submodule_name_camel##", 'g')

        let controllersPath = getJsUrl() + "/" + moduleNameToFolderName(module.name) + "/controllers";
        if(!fs.existsSync(controllersPath)) fs.mkdirSync(controllersPath);

        //lettura del template per i controllers
        fs.readFile(controllersTemplatePath, 'utf8',function read(err, data) {
            if (err)  {
                log("Errore durante la lettura del file : " + controllersTemplatePath);
                Promise.reject(err);
            } else {
                for(let i=0; i<arr_submodules.length; i++) {
                    let submoduleName = arr_submodules[i].name;
                    let templateBodyTemp = data.replace(submoduleNameCamelRegex, submoduleName).replace(moduleNameCamelRegex, moduleNameCamel);
                    let submoduleControllerFilePath = controllersPath + "/" + submoduleName + "Ctrl" + ".js";
                    textToFile(templateBodyTemp, submoduleControllerFilePath, false);
                }
            }
        });
    }


    var generateServices = (module, arr_submodules) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];

        let moduleNameCamel = module.name;

        let submoduleNameCamelRegex = new RegExp("##submodule_name_camel##", 'g')

        let servicesPath = getJsUrl() + "/" + moduleNameToFolderName(module.name) + "/services";
        if(!fs.existsSync(servicesPath)) fs.mkdirSync(servicesPath);

        //lettura del template per i services
        fs.readFile(servicesTemplatePath, 'utf8',function read(err, data) {
            if (err)  {
                log("Errore durante la lettura del file : " + servicesTemplatePath);
                Promise.reject(err);
            } else {
                //nel caso dei services creiamo anche un commonmodulenamesrvc che sarà iniettato in tutti i controllers
                let templateBodyTemp = data.replace(submoduleNameCamelRegex, moduleNameCamel);
                let submoduleServiceFilePath = servicesPath + "/" + "Common" + moduleNameCamel + "Srvc" + ".js"; 
                textToFile(templateBodyTemp, submoduleServiceFilePath, false);

                for(let i=0; i<arr_submodules.length; i++) {
                    let submoduleName = arr_submodules[i].name;
                    templateBodyTemp = data.replace(submoduleNameCamelRegex, submoduleName);
                    submoduleServiceFilePath = servicesPath + "/" + submoduleName + "Srvc" + ".js" 
                    textToFile(templateBodyTemp, submoduleServiceFilePath, false);
                }
            }
        });
    }


    var generateDirectives = (module) => {
        let directivesPath = getJsUrl() + "/" + moduleNameToFolderName(module.name) + "/directives";
        if(!fs.existsSync(directivesPath)) fs.mkdirSync(directivesPath);
        let directiveFilePath = directivesPath + "/directives.js" 
        textToFile("", directiveFilePath, false);
    }

    var generateFilters = (module) => {
        let filtersPath = getJsUrl() + "/" + moduleNameToFolderName(module.name) + "/filters";
        if(!fs.existsSync(filtersPath)) fs.mkdirSync(filtersPath);
        let filterFilePath = filtersPath + "/filters.js" 
        textToFile("", filterFilePath, false);
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

        generateJsFolders(modulea.name);
        generateHtmlFolders(modulea.name);

        generateViews(modulea, submodules);

        generateControllers(modulea, submodules);
        generateServices(modulea, submodules);
        generateDirectives(modulea);
        generateFilters(modulea);

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
