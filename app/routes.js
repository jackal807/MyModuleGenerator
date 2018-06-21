module.exports = function(app, io, jwt, cheerio, fs, request) {

	var mongoose       = require('mongoose');
    var dbconnection = mongoose.connection;

    var project_base_url = "C:/Users/DANIELE-PC/git/mysaas/MySaas";
    var project_webapp_url = "mysaas-webapp";
    var project_core_url = "mysaas-core";

    var pathConfigurationCustomPath = "mymodulegenerator_resources/path_configuration_custom.json";
    var pathConfigurationDefaultPath = "mymodulegenerator_resources/path_configuration_default.json";

    /* VELOCITY */
    var velocity_base_url ="src/main/webapp/WEB-INF/template/v2";
    var velocityTemplatePath = "mymodulegenerator_resources/velocity_template.txt";
    var velocityJsImportTemplatePath = "mymodulegenerator_resources/velocity_js_import_template.txt";

    /* HTML */
    var view_base_url ="src/main/webapp/backoffice/v2/angular-resources";
    var viewsTemplatePath = "mymodulegenerator_resources/view_template.txt";
   
    
    /* CSS */
    var css_base_url ="src/main/webapp/backoffice/v2/css";

    /* JS */
    var js_base_url ="src/main/webapp/backoffice/v2/js/angular";
    var controllersTemplatePath = "mymodulegenerator_resources/controller_template.txt";
    var servicesTemplatePath = "mymodulegenerator_resources/service_template.txt";
    var configTemplatePath = "mymodulegenerator_resources/config_template.txt";
    var configStateTemplatePath = "mymodulegenerator_resources/config_state_template.txt";

    

    /* JAVA */
    var java_base_url ="src/main/java/com/mycomp";
    var javaActionTemplatePath = "mymodulegenerator_resources/java_action_template.txt";

    var log = (msg, title) => {
        //aggiungere eventualmente la generazione notifiche
        console.log(msg);
    };

    getJavaActionUrl = () => {
        return project_base_url + "/" + project_core_url + "/" + java_base_url;
    }

    var getViewsUrl = () => {
        return project_base_url + "/" + project_webapp_url + "/" + view_base_url;
    }

    var getCssUrl = () => {
        return project_base_url + "/" + project_webapp_url + "/" + css_base_url;
    }

    var getJsUrl = () => {
        return project_base_url + "/" + project_webapp_url + "/" + js_base_url;
    }

    var getVelocityUrl = () => {
        return project_base_url + "/" + project_webapp_url + "/" + velocity_base_url;
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
        return camelToDelimiter(moduleNameCamel);
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

    var generateCssFolder = (moduleNameCamel) => {
        let cssUrl = getCssUrl();
        let moduleCssUrl = cssUrl + "/" + moduleNameToFolderName(moduleNameCamel);
        createDirList([moduleCssUrl]);
    }

    var generateVelocityFolder = (moduleNameCamel) => {
        let velocityUrl = getVelocityUrl();
        let moduleVelocityUrl = velocityUrl + "/" + moduleNameToFolderName(moduleNameCamel);
        createDirList([moduleVelocityUrl]);
    }



    var generateViews = (module, arr_submodules) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];

        let moduleNameCamel = module.name;

        let submoduleNameRegex = new RegExp("##submodule_name##", 'g');

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



    var generateStyles = (module, arr_submodules) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];
        let moduleNameCamel = module.name;
        let cssPath = getCssUrl() + "/" + moduleNameToFolderName(moduleNameCamel);
        if(!fs.existsSync(cssPath)) fs.mkdirSync(cssPath);
        let cssFilePath = cssPath + "/" + camelToDelimiter(moduleNameCamel) + "-commons.css" ;
        textToFile("", cssFilePath, false);
    }


    var generateJavaAction = (module) => {
        let moduleNameCamel = module.name;
        let moduleNameLower = module.name.toLowerCase();
        let moduleNameFolder = moduleNameToFolderName(module.name);


        let moduleNameCamelRegex = new RegExp("##module_name_camel##", 'g');
        let moduleNameLowerRegex = new RegExp("##module_name_lower_case##", 'g');
        let moduleNameFolderRegex = new RegExp("##module_name_folder##", 'g');

        let javaActionPath = getJavaActionUrl() + "/" + moduleNameLower;
        if(!fs.existsSync(javaActionPath)) fs.mkdirSync(javaActionPath);
        let javaActionFilePath = javaActionPath + "/" + moduleNameCamel + "Action.java" ;

        fs.readFile(javaActionTemplatePath, 'utf8',function read(err, javaActionTemplateFileContent) {
            if (err)  {
                log("Errore durante la lettura del file : " + configTemplatePath);
                Promise.reject(err);
            } else { 
                let javaActionBodyTemp = javaActionTemplateFileContent
                .replace(moduleNameCamelRegex, moduleNameCamel)
                .replace(moduleNameLowerRegex, moduleNameLower)
                .replace(moduleNameFolderRegex,moduleNameFolder);

                textToFile(javaActionBodyTemp, javaActionFilePath, false);
            }
        });
    }





    var generateConfig = (module, arr_submodules) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];

        let moduleNameLowerCase = module.name.toLowerCase();
        let moduleNameFolder = moduleNameToFolderName(module.name);

        let submoduleNameCamelRegex = new RegExp("##submodule_name_camel##", 'g');

        let moduleNameLowerRegex = new RegExp("##module_name_lower_case##", 'g');
        let submoduleNameLowerRegex = new RegExp("##submodule_name_lower_case##", 'g');

        let moduleNameFolderRegex = new RegExp("##module_name_folder##", 'g');
        let submoduleNameFolderRegex = new RegExp("##submodule_name_folder##", 'g');

        let statesListRegex = new RegExp("##states_list##", 'g');

        let configPath = getJsUrl() + "/" + moduleNameToFolderName(module.name) + "/conf";
        if(!fs.existsSync(configPath)) fs.mkdirSync(configPath);

        //lettura del template per i controllers
        fs.readFile(configTemplatePath, 'utf8',function read(err, configTemplateFileContent) {
            if (err)  {
                log("Errore durante la lettura del file : " + configTemplatePath);
                Promise.reject(err);
            } else {
                fs.readFile(configStateTemplatePath, 'utf8',function read(err, configStateTemplateFileContent) { 
                    if (err)  {
                        log("Errore durante la lettura del file : " + configStateTemplatePath);
                        Promise.reject(err);
                    } else { 
                        let statesList = "";
                        for(let i=0; i<arr_submodules.length; i++) {

                            let submoduleNameCamel = arr_submodules[i].name;
                            let submoduleNameLowerCase = arr_submodules[i].name.toLowerCase();
                            let submoduleNameFolder = moduleNameToFolderName(arr_submodules[i].name);

                            //replace nel template singolo stato
                            let configStateTemplateBodyTemp = configStateTemplateFileContent
                            .replace(submoduleNameLowerRegex, submoduleNameLowerCase)
                            .replace(moduleNameLowerRegex, ("/" + moduleNameLowerCase))
                            .replace(moduleNameFolderRegex, moduleNameFolder)
                            .replace(submoduleNameFolderRegex, submoduleNameFolder)
                            .replace(submoduleNameCamelRegex, submoduleNameCamel);

                            statesList += configStateTemplateBodyTemp;
                        }

                        //replace nel template config complessivo
                        let configStateTemplateBodyTemp = configTemplateFileContent
                        .replace(moduleNameLowerRegex, moduleNameLowerCase)
                        .replace(statesListRegex, statesList);
                        let configFilePath = configPath + "/config.js" ;
                        textToFile(configStateTemplateBodyTemp, configFilePath, false);
                    }
                });
            }
        });
    }





    var generateControllers = (module, arr_submodules) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];

        let moduleNameCamel = module.name;

        let moduleNameCamelRegex = new RegExp("##module_name_camel##", 'g');
        let submoduleNameCamelRegex = new RegExp("##submodule_name_camel##", 'g');

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

        let submoduleNameCamelRegex = new RegExp("##submodule_name_camel##", 'g');

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




    var generateVelocity = (module, arr_submodules, template_title, menu_active) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];

        let moduleNameFolderRegex = new RegExp("##module_name_folder##", 'g');
        let moduleNameFolderSlashRegex = new RegExp("##module_name_folder_slash##", 'g');
        let templateTitleRegex = new RegExp("##template_title##", 'g');
        let menuActiveRegex = new RegExp("##menu_active##", 'g');
        let servicesImportsRegex = new RegExp("##services_imports##", 'g');
        let controllersImportsRegex = new RegExp("##controllers_imports##", 'g');

        let serviceOrControllerRegex = new RegExp("##service_or_controller##", 'g');
        let submoduleFileNameCamelRegex = new RegExp("##submodule_file_name_camel##", 'g');

        let moduleNameFolder = moduleNameToFolderName(module.name);

        let velocityPath = getVelocityUrl() + "/" + moduleNameToFolderName(module.name);
        if(!fs.existsSync(velocityPath)) fs.mkdirSync(velocityPath);

        //lettura del template per i controllers
        fs.readFile(velocityTemplatePath, 'utf8',function read(err, velocityTemplateFileContent) {
            if (err)  {
                log("Errore durante la lettura del file : " + velocityTemplatePath);
                Promise.reject(err);
            } else {


                fs.readFile(velocityJsImportTemplatePath, 'utf8',function read(err, velocityJsImportTemplateFileContent) {
                    if (err)  {
                        log("Errore durante la lettura del file : " + velocityJsImportTemplatePath);
                        Promise.reject(err);
                    } else { 
                        let servicesImportList = "";
                        let controllersImportList = "";

                        //TODO AGGIUNGERE COMMONSSRVC
                        let templateSrvcBodyTemp = velocityJsImportTemplateFileContent
                            .replace(moduleNameFolderSlashRegex, "/" + moduleNameFolder)
                            .replace(serviceOrControllerRegex, "/services")
                            .replace(submoduleFileNameCamelRegex,"/" +  "Common" + module.name + "Srvc.js");

                        servicesImportList += templateSrvcBodyTemp;

                        for(let i=0; i<arr_submodules.length; i++) {
                            let submoduleName = arr_submodules[i].name;

                            //replace del singolo import javascript per i servizi
                            templateSrvcBodyTemp = velocityJsImportTemplateFileContent
                            .replace(moduleNameFolderSlashRegex, "/" + moduleNameFolder)
                            .replace(serviceOrControllerRegex, "/services")
                            .replace(submoduleFileNameCamelRegex,"/" +  submoduleName + "Srvc.js");

                            //replace del singolo import javascript per i controller
                            let templateCtrlBodyTemp = velocityJsImportTemplateFileContent
                            .replace(moduleNameFolderSlashRegex, "/" + moduleNameFolder)
                            .replace(serviceOrControllerRegex, "/controllers")
                            .replace(submoduleFileNameCamelRegex,"/" +  submoduleName + "Ctrl.js");

                            servicesImportList += templateSrvcBodyTemp;
                            controllersImportList += templateCtrlBodyTemp;
                        }

                        let templateVelocityBodyTemp = velocityTemplateFileContent
                        .replace(servicesImportsRegex, servicesImportList)
                        .replace(controllersImportsRegex, controllersImportList)
                        .replace(moduleNameFolderRegex, moduleNameFolder)
                        .replace(moduleNameFolderSlashRegex, "/" + moduleNameFolder)
                        .replace(templateTitleRegex, template_title)
                        .replace(menuActiveRegex, menu_active);

                        let velocityFilePath = velocityPath + "/" + moduleNameToFolderName(module.name) + ".vm";
                        textToFile(templateVelocityBodyTemp, velocityFilePath, false);

                    }
                });
            }
        });
    }





    var getPathConfiguration = () => {
        let p = new Promise(function(resolve, reject){ 
            if(fs.existsSync(pathConfigurationCustomPath)) {
                fs.readFile(pathConfigurationCustomPath, 'utf8',function read(err, data) {
                    let jsonConfiguration = JSON.parse(data);
                    resolve(jsonConfiguration);
                });
            } else {
                fs.readFile(pathConfigurationDefaultPath, 'utf8',function read(err, data) {
                    let jsonConfiguration = JSON.parse(data);
                    resolve(jsonConfiguration);
                });
            }  
        });
        return p;
    }


    var savePathConfiguration = (configJson) => {
        if(fs.existsSync(pathConfigurationCustomPath)) fs.unlinkSync(pathConfigurationCustomPath);
        textToFile(configJson, pathConfigurationCustomPath, true);
    }



    app.get('/api/getPathConfiguration', function(req, res){ 
        getPathConfiguration().then((pathConfiguration) => res.json({"data" : pathConfiguration}));
    });


    app.post('/api/savePathConfiguration', function(req, res) {
        let configJson = req.body;
        savePathConfiguration(configJson);
        res.json({"status" : "ok"});
    });


    app.get('/api/generatetemplates', function(req, res){ 
        
        let title = "Prova";
        let menuActive = "prova";

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
        generateCssFolder(modulea.name);

        generateVelocityFolder(modulea.name);

        generateViews(modulea, submodules);

        generateStyles(modulea, submodules);

        generateControllers(modulea, submodules);
        generateServices(modulea, submodules);
        generateConfig(modulea, submodules);
        generateDirectives(modulea);
        generateFilters(modulea);

        generateVelocity(modulea, submodules, title, menuActive);

        generateJavaAction(modulea);

    });

        /* UTILITIES */

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


	app.get('*', function(req, res) {
			res.sendfile('./public/mymodulegenerator/www/index.html');
	});

};
