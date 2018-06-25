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

    /* NAVBAR SNIPPET */
    var moduleMenuVelocityTemplatePath = "mymodulegenerator_resources/module_menu_velocity_template.txt";
    var submoduleMenuContainerVelocityTemplatePath = "mymodulegenerator_resources/submodule_menu_container_velocity_template.txt";
    var submoduleMenuVelocityTemplatePath = "mymodulegenerator_resources/submodule_menu_velocity_template.txt";

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

    var createdFiles = [];
    var deletedFiles = [];
    var navbarMenuSnippet = "";

    var addCreatedFile = (path, filename, folderOrFile) => {
        let i = {"path" : path, "name" : filename, "type" : folderOrFile };
        createdFiles.push(i);
    }

    /* JAVA */
    var java_base_url ="src/main/java/com/mycomp";
    var javaActionTemplatePath = "mymodulegenerator_resources/java_action_template.txt";
    var javaServletControllerTemplatePath = "mymodulegenerator_resources/servlet_controller_template.txt";

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

    var pathToFileName = (path) => {
        let pathSplit = path.split("/");
        return pathSplit[pathSplit.length-1];
    }

    var deleteFolderRecursive = (path) => {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file) {
              var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                    if(deletedFiles) deletedFiles.push({"path" : curPath, "name" : pathToFileName(curPath), "type" : "file"});
                }
            });
            fs.rmdirSync(path);
            if(deletedFiles) deletedFiles.push({"path" : path, "name" : pathToFileName(path), "type" : "folder"});
          }
      };


    var createDirList = (dirList) => {
        var p = new Promise(function(resolve, reject){
            for(let i=0; i<dirList.length; i++) {
                if(!fs.existsSync(dirList[i])) {
                    fs.mkdirSync(dirList[i]);
                    addCreatedFile(dirList[i], pathToFileName(dirList[i]), "folder");
                }
                if(i==(dirList.length-1)) resolve();
            }
        });
        return p;
    }


    var generateJsFolders = (moduleNameCamel) => {
        var p = new Promise(function(resolve, reject){ 
            let jsUrl = getJsUrl();
            let moduleJsUrl = jsUrl + "/" + moduleNameToFolderName(moduleNameCamel);
            let controllersDirPath = moduleJsUrl + "/controllers";
            let servicesDirPath = moduleJsUrl + "/services";
            let directivesDirPath = moduleJsUrl + "/directives";
            let filtersDirPath = moduleJsUrl + "/filters";
            let confDirPath = moduleJsUrl + "/conf";
            createDirList([moduleJsUrl, controllersDirPath, servicesDirPath, directivesDirPath, filtersDirPath, confDirPath]).then(() => {
                resolve();
            })
        });
        return p;
    }


    var generateHtmlFolders = (moduleNameCamel) => {
        var p = new Promise(function(resolve, reject){ 
            let htmlUrl = getViewsUrl();
            let moduleHtmlUrl = htmlUrl + "/" + moduleNameToFolderName(moduleNameCamel);
            let directivesDirPath = moduleHtmlUrl + "/directives";
            let modalsDirPath = moduleHtmlUrl + "/modals";
            let viewsDirPath = moduleHtmlUrl + "/views";
            let partialsDirPath = viewsDirPath + "/partials";

            createDirList([moduleHtmlUrl, directivesDirPath, modalsDirPath, viewsDirPath, partialsDirPath]).then(() => {
                resolve();
            });
        });
        return p;
    }

    var generateCssFolder = (moduleNameCamel) => {
        var p = new Promise(function(resolve, reject){ 
            let cssUrl = getCssUrl();
            let moduleCssUrl = cssUrl + "/" + moduleNameToFolderName(moduleNameCamel);
            createDirList([moduleCssUrl]).then(() => {
                resolve();
            });
        });
        return p;
    }

    var generateVelocityFolder = (moduleNameCamel) => {
        var p = new Promise(function(resolve, reject){ 
            let velocityUrl = getVelocityUrl();
            let moduleVelocityUrl = velocityUrl + "/" + moduleNameToFolderName(moduleNameCamel);
            createDirList([moduleVelocityUrl]).then(() => {
                resolve();
            });
        });
        return p;
    }


    var generateJavaFolder = (moduleNameCamel) => {
        var p = new Promise(function(resolve, reject){ 
            let javaUrl = getJavaActionUrl();
            let moduleJavaUrl = javaUrl + "/" + moduleNameCamel.toLowerCase();
            let moduleJavaActionUrl = moduleJavaUrl + "/action"
            createDirList([moduleJavaUrl, moduleJavaActionUrl]).then(() => {
                resolve();
            });
        });
        return p;
    }



    var generateViews = (module, arr_submodules) => {
        //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
        var p = new Promise(function(resolve, reject){ 
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
                        textToFile(templateBodyTemp, submoduleViewFilePath, false).then(() => { resolve() });
                    }
                }
            });
        });
        return p;
    }


    var generateNavbarSnippet = (module, arr_submodules) => {
        var p = new Promise(function(resolve, reject){
            //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
            let hasSubmenu = true;
            if(!arr_submodules || !arr_submodules.length) {
                arr_submodules = [module];
                hasSubmenu = false;
            }

            //template padre
            let moduleNameLowerCaseRegex = new RegExp("##module_name_lower_case##", 'g');
            let moduleNameLowerCaseSlashRegex = new RegExp("##module_name_lower_case_slash##", 'g');
            let defaultSubmoduleNameLowerCaseRegex = new RegExp("##default_submodule_name_lower_case##", 'g');
            let defaultSubmoduleNameLowerCaseSlashRegex = new RegExp("##default_submodule_name_lower_case_slash##", 'g');
            let menuActiveRegex = new RegExp("##menu_active##", 'g');
            let moduleMenuLabelRegex = new RegExp("##module_menu_label##", 'g');
            let submoduleMenuContainerRegex = new RegExp("##submodule_menu_container##", 'g');

            //submenu container
            let submoduleMenuItemsRegex = new RegExp("##submodule_menu_items##", 'g');

            //submenu items
            //##menu_active##
            let submoduleNameLowerCaseRegex = new RegExp("##submodule_name_lower_case##", 'g');
            let submoduleNameLowerCaseSlashRegex = new RegExp("##submodule_name_lower_case_slash##", 'g');
            //##module_name_lower_case##
            //##module_name_lower_case_slash##
            let submoduleMenuLabelRegex = new RegExp("##submodule_menu_label##", 'g');

            let moduleNameLowerCase = module.name.toLowerCase();
            let menuActive = module.menuActive;
            let moduleMenuLabel = module.menuLabel;

            let defaultSubmoduleNameLowerCase = moduleNameLowerCase;
            for(let i=0; i<arr_submodules.length; i++) {
                if(arr_submodules[i].isDefault) defaultSubmoduleNameLowerCase = arr_submodules[i].name.toLowerCase();
            }
            
            //lettura del template per il navbar snippet
            fs.readFile(moduleMenuVelocityTemplatePath, 'utf8',function read(err, moduleMenuVelocityTemplateFileContent) {
                if (err)  {
                    log("Errore durante la lettura del file : " + moduleMenuVelocityTemplatePath);
                    reject(err);
                } else {
                    
                    let moduleMenuVelocityTemplateBodyTemp = moduleMenuVelocityTemplateFileContent
                    .replace(moduleNameLowerCaseRegex, moduleNameLowerCase)
                    .replace(moduleNameLowerCaseSlashRegex, "/" + moduleNameLowerCase)
                    .replace(defaultSubmoduleNameLowerCaseRegex, defaultSubmoduleNameLowerCase)
                    .replace(defaultSubmoduleNameLowerCaseSlashRegex, "/" + defaultSubmoduleNameLowerCase)
                    .replace(menuActiveRegex, menuActive)
                    .replace(moduleMenuLabelRegex, moduleMenuLabel);

                    if(!hasSubmenu) {
                        navbarMenuSnippet = moduleMenuVelocityTemplateBodyTemp
                        .replace(submoduleMenuContainerRegex, "")
                        resolve(navbarMenuSnippet);
                    } else {
                        //lettura template container per i sottomenu
                        fs.readFile(submoduleMenuContainerVelocityTemplatePath, 'utf8',function read(err, submoduleMenuContainerVelocityTemplateFileContent) {
                            if (err)  {
                                log("Errore durante la lettura del file : " + submoduleMenuContainerVelocityTemplatePath);
                                reject(err);
                            } else { 
                                //lettura template singolo item del submenu
                                fs.readFile(submoduleMenuVelocityTemplatePath, 'utf8',function read(err, submoduleMenuVelocityTemplateFileContent) {
                                    if (err)  {
                                        log("Errore durante la lettura del file : " + submoduleMenuVelocityTemplatePath);
                                        reject(err);
                                    } else { 
                                        let submoduleItemList = "";
                                        for(let i=0; i<arr_submodules.length; i++) {
                                            let submoduleNameLowerCase = arr_submodules[i].name.toLowerCase();
                                            let submoduleMenuLabel = arr_submodules[i].menuLabel;

                                            let submoduleMenuItemBodyTemp = submoduleMenuVelocityTemplateFileContent
                                            .replace(submoduleNameLowerCaseRegex, submoduleNameLowerCase)
                                            .replace(submoduleNameLowerCaseSlashRegex, "/" + submoduleNameLowerCase)
                                            .replace(menuActiveRegex, menuActive)
                                            .replace(moduleNameLowerCaseRegex, moduleNameLowerCase)
                                            .replace(moduleNameLowerCaseSlashRegex, "/" + moduleNameLowerCase)
                                            .replace(submoduleMenuLabelRegex, submoduleMenuLabel);

                                            submoduleItemList += submoduleMenuItemBodyTemp;
                                        
                                        }

                                        //FINE LOOP SUBMODULES
                                        let submoduleContainerBodyTemp = submoduleMenuContainerVelocityTemplateFileContent
                                        .replace(submoduleMenuItemsRegex, submoduleItemList);
                                        let navbarSnippetBodyTemp = moduleMenuVelocityTemplateBodyTemp
                                        .replace(submoduleMenuContainerRegex, submoduleContainerBodyTemp);
                                        resolve(navbarSnippetBodyTemp);

                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
        return p;
    }



    var generateStyles = (module, arr_submodules) => {
        var p = new Promise(function(resolve, reject){ 
            //se non ci sono sottomoduli il modulo principale viene considerato come uno di essi
            if(!arr_submodules || !arr_submodules.length) arr_submodules = [module];
            let moduleNameCamel = module.name;
            let cssPath = getCssUrl() + "/" + moduleNameToFolderName(moduleNameCamel);
            if(!fs.existsSync(cssPath)) fs.mkdirSync(cssPath);
            let cssFilePath = cssPath + "/" + camelToDelimiter(moduleNameCamel) + "-commons.css" ;
            textToFile("", cssFilePath, false).then(() => { resolve() });
        });
        return p;
    }


    var generateJavaAction = (module) => {
        var p = new Promise(function(resolve, reject){ 
            let moduleNameCamel = module.name;
            let moduleNameFolder = moduleNameToFolderName(module.name);
            let moduleNameLower = module.name.toLowerCase();


            let moduleNameCamelRegex = new RegExp("##module_name_camel##", 'g');
            let moduleNameFolderRegex = new RegExp("##module_name_folder##", 'g');
            let moduleNameLowerCaseRegex = new RegExp("##module_name_lower_case##", 'g');

            let javaActionPath = getJavaActionUrl() + "/" + moduleNameLower + "/action";
            if(!fs.existsSync(javaActionPath)) fs.mkdirSync(javaActionPath);
            let javaActionFilePath = javaActionPath + "/" + moduleNameCamel + "Action.java" ;

            fs.readFile(javaActionTemplatePath, 'utf8',function read(err, javaActionTemplateFileContent) {
                if (err)  {
                    log("Errore durante la lettura del file : " + configTemplatePath);
                    Promise.reject(err);
                } else { 
                    let javaActionBodyTemp = javaActionTemplateFileContent
                    .replace(moduleNameCamelRegex, moduleNameCamel)
                    .replace(moduleNameLowerCaseRegex, moduleNameLower)
                    .replace(moduleNameFolderRegex, moduleNameFolder);

                    textToFile(javaActionBodyTemp, javaActionFilePath, false).then(() => { resolve() });
                }
            });
        });
        return p;
    }


    var generateServletController = (module) => {
        var p = new Promise(function(resolve, reject){ 
            let moduleNameCamel = module.name;
            let moduleNameLowerCase = module.name.toLowerCase();
            let serialUid = new Date();
    
            let moduleNameCamelRegex = new RegExp("##module_name_camel##", 'g');
            let moduleNameLowerCaseRegex = new RegExp("##module_name_lower_case##", 'g');
            let moduleNameLowerCaseSlashRegex = new RegExp("##module_name_lower_case_slash##", 'g');
            let serialUidRegex = new RegExp("##serial_uid##", 'g');

            let javaServletControllerPath = getJavaActionUrl() + "/" + moduleNameLowerCase;
            if(!fs.existsSync(javaServletControllerPath)) fs.mkdirSync(javaServletControllerPath);
            let javaServletControllerFilePath = javaServletControllerPath + "/Controller" + moduleNameCamel + "Servlet.java" ;

            fs.readFile(javaServletControllerTemplatePath, 'utf8',function read(err, javaServletControllerTemplateFileContent) {
                if (err)  {
                    log("Errore durante la lettura del file : " + javaServletControllerTemplatePath);
                    Promise.reject(err);
                } else { 
                    let javaServletControllerBodyTemp = javaServletControllerTemplateFileContent
                    .replace(moduleNameCamelRegex, moduleNameCamel)
                    .replace(moduleNameLowerCaseRegex, moduleNameLowerCase)
                    .replace(moduleNameLowerCaseSlashRegex, "/" + moduleNameLowerCase)
                    .replace(serialUidRegex, serialUid.getTime());
                    textToFile(javaServletControllerBodyTemp, javaServletControllerFilePath, false).then(() => { resolve() });
                }
            });
        });
        return p;

    }





    var generateConfig = (module, arr_submodules) => {
        var p = new Promise(function(resolve, reject){ 
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
                            textToFile(configStateTemplateBodyTemp, configFilePath, false).then(() => { resolve() });
                        }
                    });
                }
            });
        });
        return p;
    }





    var generateControllers = (module, arr_submodules) => {
        var p = new Promise(function(resolve, reject){ 
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
                        textToFile(templateBodyTemp, submoduleControllerFilePath, false).then(() => { resolve() });
                    }
                }
            });
        });
        return p;
    }


    var generateServices = (module, arr_submodules) => {
        var p = new Promise(function(resolve, reject){ 
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
                    let templateBodyTemp = data.replace(submoduleNameCamelRegex, "Common" + moduleNameCamel);
                    let submoduleServiceFilePath = servicesPath + "/" + "Common" + moduleNameCamel + "Srvc" + ".js"; 
                    textToFile(templateBodyTemp, submoduleServiceFilePath, false);

                    for(let i=0; i<arr_submodules.length; i++) {
                        let submoduleName = arr_submodules[i].name;
                        templateBodyTemp = data.replace(submoduleNameCamelRegex, submoduleName);
                        submoduleServiceFilePath = servicesPath + "/" + submoduleName + "Srvc" + ".js" 
                        textToFile(templateBodyTemp, submoduleServiceFilePath, false).then(() => { resolve() });
                    }
                }
            });
        });
        return p;
    }


    var generateDirectives = (module) => {
        var p = new Promise(function(resolve, reject){ 
            let directivesPath = getJsUrl() + "/" + moduleNameToFolderName(module.name) + "/directives";
            if(!fs.existsSync(directivesPath)) fs.mkdirSync(directivesPath);
            let directiveFilePath = directivesPath + "/directives.js" 
            textToFile("", directiveFilePath, false).then(() => { resolve() });
        });
        return p;
    }

    var generateFilters = (module) => {
        var p = new Promise(function(resolve, reject){ 
            let filtersPath = getJsUrl() + "/" + moduleNameToFolderName(module.name) + "/filters";
            if(!fs.existsSync(filtersPath)) fs.mkdirSync(filtersPath);
            let filterFilePath = filtersPath + "/filters.js" 
            textToFile("", filterFilePath, false).then(() => { resolve() });
        });
        return p;
    }




    var generateVelocity = (module, arr_submodules, template_title, menu_active) => {
        var p = new Promise(function(resolve, reject){ 
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
                            textToFile(templateVelocityBodyTemp, velocityFilePath, false).then(() => { resolve() });

                        }
                    });
                }
            });
        });
        return p;
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

    var getPathByKey = (key, pc) => {
        for(let i=0; i<pc.length; i++) {
            if(pc[i].key == key) return pc[i].value;
        }
    }

    var initPathConfiguration = () => {
        let p = new Promise(function(resolve, reject){
            getPathConfiguration().then((pc) => {
                project_base_url = getPathByKey("project_base_url",pc);
                project_webapp_url = getPathByKey("project_webapp_url",pc);
                project_core_url = getPathByKey("project_core_url",pc);
                velocity_base_url = getPathByKey("velocity_base_url",pc);
                view_base_url = getPathByKey("view_base_url",pc);
                css_base_url = getPathByKey("css_base_url",pc);
                js_base_url = getPathByKey("js_base_url",pc);
                java_base_url = getPathByKey("java_base_url",pc);
                resolve();
            });
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


    app.post('/api/deleteSingle', function(req, res) { 
        let path = req.body;
        if(fs.existsSync(path)) {
            if(fs.statSync(path).isDirectory()) deleteFolderRecursive(path);
            else fs.unlinkSync(path);
            res.json({"deleted" : "ok"});
        } else res.json({"deleted" : "ko", "error" : "file or folder not found"});
    });

    app.post('/api/deleteModule', function(req, res) {
        let pathList = req.body;
        deletedFiles = [];
        for(let i=0; i<pathList.length; i++) {
            console.log("Provo a cancellare il file con path : ");
            console.log(pathList[i].path);
            if(fs.existsSync(pathList[i].path)) 
                if(fs.statSync(pathList[i].path).isDirectory()) deleteFolderRecursive(pathList[i].path);
                else {
                    fs.unlinkSync(pathList[i].path);
                    deletedFiles.push(pathList[i]);
                }
        }
        res.json({"status" : "ok", "deletedFiles" : deletedFiles});
    });


    app.post('/api/generate', function(req, res){ 
        

        let reqBody = req.body;
        let module = reqBody.module;
        let submodules = reqBody.submodules;
        let menuLabel = module.menuLabel;
        let menuActive = module.menuActive;

        initPathConfiguration().then(() => {
            generateJsFolders(module.name).then(() => {
                generateHtmlFolders(module.name).then(() => {
                    generateCssFolder(module.name).then(() => {
                        generateJavaFolder(module.name).then(() => {
                            generateVelocityFolder(module.name).then(() => {
                                generateViews(module, submodules).then(() => {
                                    generateStyles(module, submodules).then(() => {
                                        generateControllers(module, submodules).then(() => {
                                            generateServices(module, submodules).then(() => {
                                                generateConfig(module, submodules).then(() => {
                                                    generateDirectives(module).then(() => {
                                                        generateFilters(module).then(() => {
                                                            generateVelocity(module, submodules, menuLabel, menuActive).then(() => {
                                                                generateServletController(module).then(() => {
                                                                    generateJavaAction(module).then(() => {                
                                                                                generateNavbarSnippet(module,submodules).then((navbarSnippet) => {
                                                                                    res.json({"createdFiles" : createdFiles, "navbarSnippet" : navbarSnippet});
                                                                                });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                                
                  
                    });
                });
            });
        });
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
                    addCreatedFile(fileName, pathToFileName(fileName), "file");
                    resolve();
                });
            });
            return p;
        }


	app.get('*', function(req, res) {
			res.sendfile('./public/mymodulegenerator/www/index.html');
	});

};
