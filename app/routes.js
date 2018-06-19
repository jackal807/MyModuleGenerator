module.exports = function(app, io, jwt, cheerio, fs, request) {


    var Note = require('./models/note');
    var Brand = require('./models/brand');
    var Perfume = require('./models/perfume');

	var mongoose       = require('mongoose');
    var dbconnection = mongoose.connection;
    


    /* ACTION ROUTES */

    app.get('/api/scrapebrandlist', function(req, res){ 
        console.log("called scrape brand list");
        getBrandList(1);
    });

    app.get('/api/insertbrandlist', function(req, res){ 
        console.log("called insert brand list");
        insertAllBrands();
    });

    app.get('/api/insertperfumeList', function(req, res){ 
        console.log("called insert brand list");
        insertPerfumeListNew("perfumesNew-1.json");
    });





    /* LISTA DI TUTTE LE NOTE */
	app.get('/api/getNoteList', function(req, res) {
		Note.find(function(err, noteList) {
            if(err) res.send(err);
			res.json(noteList);
		});
    });

    /* LISTA DI TUTTE LE NOTE FILTRATE PER PAROLA CHIAVE */
    app.get('/api/getNoteListByKey:key', function(req, res) {
        console.log("key -> " + req.params.key);
        let k = req.params.key.replace(':', '');
        if(k=="") res.json([]);
        let re = new RegExp(k, 'i');
        console.log(re);
		Note.find({ "name" : new RegExp(k, 'i')}, function(err, noteList) {
            if(err) res.send(err);
            console.log(noteList)
			res.json(noteList);
		});
	});

    /* LISTA DI TUTTI I PROFUMI */
    app.get('/api/getPerfumeList', function(req, res) {
        Perfume.find(function(err, perfumeList) {
            if(err) res.send(err);
            res.json(perfumeList);
        });
    });


    /* LISTA DI TUTTI I PROFUMI FILTRATI PER PAROLA CHIAVE */
    app.get('/api/getPerfumeListByKey:key', function(req, res) {
        console.log("key -> " + req.params.key);
        let k = req.params.key.replace(':', '');
        if(k=="") res.json([]);
        let re = new RegExp(k, 'i');
        console.log(re);
        Perfume.find({ "name" : new RegExp(k, 'i')}, function(err, perfumeList) {
            if(err) res.send(err);
            console.log(perfumeList)
            res.json(perfumeList);
        });
    });




    var insertSingleBrand = function(brand) {
        var newBrand = new Brand(brand);
        newBrand.save(function(err, addedBrand) {
            if (err) {
                console.log("Si è verificato un errore durante l'inserimento del brand " + brand.name);
            }
            else { 
                console.log(brand.name + " inserito correttamente");
            }

        });
    }


    var insertAllBrands = function() {
        for(var i=1; i<12; i++) {
            fs.readFile('brands-new-' + i + '.json', 'utf8',function read(err, data) {
                if (err) {
                    console.log(err);
                }
                console.log("Nessun errore");
                content = JSON.parse(data);
                for(var j=0; j<content.length; j++) {
                    console.log("scrivo content[" + j + "]");
                    console.log(content[j]);
                    insertSingleBrand(content[j]);
                }
            });
        }
    }


    var getBrandList = function(i) {
        let brandList = [];
        let brandString = "";
        //for(let i=1; i<12; i++) {
            let options = {
                "url" : 'https://www.fragrantica.it/designers-' + i + '/',
                "headers" : {
                    "authority" : "www.fragrantica.it",
                    "method" : "GET",
                    "path" : "/designers-" + i + "/",
                    "scheme" : "https",
                    "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                    "accept-language" : "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cache-control" : "max-age=0",
                    "cookie" : "__cfduid=dd44d4ad7eff72c7dbe9decd1d9f574101528099838; rtgobrt=castor; _ga=GA1.2.1607424826.1528099840; _gid=GA1.2.912984641.1528099840; OX_plg=pm; __atuvc=1%7C23",
                    "upgrade-insecure-requests" : "1",
                    "user-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
                }
            }

            request(options, function(error, response, html){
                
                var $ = cheerio.load(html);
                console.log(html)
                $('a').filter(function(){ 

                    try {
                        var data = $(this);
                        if(data[0].attribs && data[0].attribs.href && data[0].attribs.href.startsWith("/designer/")) {
                            let link = "https://www.fragrantica.it" + data[0].attribs.href;
                            let name = data[0].children[0].data;
                            console.log(name);
                            brandList.push({"likn" : link, "name" : name});
                            brandString += link + ",";
                        } else {
                        }
                    } catch(error) {
                        console.log("errore nel parsing");
                        console.error(error);
                    }
                });


                

            fs.writeFile('brands-new-' + i + '.json', JSON.stringify(brandList, null, 4), function(err){ 
                if(i<11) getBrandList(i+1);
                else return;
                
                //let p = getPerfumeListByBrandUrl([], brandList, 0);

                    
                });
                
                /*
                if(i==11) {
                    for(var j=0; j<brandList.length; j++) {
                        getPerfumeListByBrandUrl(brandList[j]);
                    }

                    return brandList;
                }
                */
            });

        
    }



    

    var getPerfumeListByBrandUrl = function(perfumeList, brandList, i) {
            let options = {
                "url" : brandList[i].likn,
                "headers" : {
                    "authority" : "www.fragrantica.it",
                    "method" : "GET",
                    "path" : "/perfume/",
                    "scheme" : "https",
                    "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                    "accept-language" : "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cache-control" : "max-age=0",
                    "cookie" : "__cfduid=db27d32633395ee40053c3085b4ce5dfd1528047210; _ga=GA1.2.164629286.1528047213; OX_plg=pm; rtgobrt=pollux; _gid=GA1.2.988974857.1528351492; frecently=a%3A3%3A%7Bi%3A191%3Bi%3A1528437742%3Bi%3A39849%3Bi%3A1528047484%3Bi%3A47837%3Bi%3A1528047368%3B%7D; XSRF-TOKEN=eyJpdiI6IkZtKzM5aEhxbWdDSnRveUN5QytLY1E9PSIsInZhbHVlIjoibGY0bnFBTTFlU2RVcmpJXC9GZWRcLzNVN3gwbmFzVEpHV0o4Zk52Zmk4bUpHSHJDTFlBR3luMDVuZ1pXQml4b0VlNzJYdEllYXczd1wvOHdlUjJGbVVCbnc9PSIsIm1hYyI6IjBkOTM3NTU2ODdiZDZlOTUyNTc5YjM2NDNkMTgzMTcyN2RmNmUyNzAzZDM5ODAzY2ZjYjhlYmIxZDU2ODk4ZDMifQ%3D%3D; laravel_session=eyJpdiI6IkpSYzd1cXE4XC9rTzZGdmErc2diXC9EUT09IiwidmFsdWUiOiJOQ0YwMXB5THZUYW1FYm0wdVdUNldBUElqZzdUSzVHVldFTkFlNWoxUENsd0VYc3RRYVdSbUVUbmVITVdCWGRMdURIc1FTNTNyZkxjbXlcLzlUOGdidWc9PSIsIm1hYyI6Ijg2MTMyZmNlZjcwYjE1MDk1MWI3YjJjZjU4Nzc2YWQ0NmFiYmFhYTUwYjhkNTI1YjJiNTViNGQwNTM5YjQ5Y2MifQ%3D%3D; OX_sd=12; __atuvc=1%7C23; __atuvs=5b1a7103d5be74d6000",
                     "upgrade-insecure-requests" : "1",
                    "user-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
                }
            }

            try {
                request(options, function(error, response, html){
                    try {
                    var $ = cheerio.load(html);
                    var res = $('a');
                    console.log("Risultato ottenuto $('a') : ");
                    console.log(res);
                    $('a').filter(function(){ 
                        var data = $(this);
                        if(data && data[0] && data[0].attribs && data[0].attribs.href && data[0].attribs.href.startsWith("/perfume/")) {
                            let link = "https://www.fragrantica.it" + data[0].attribs.href;
                            //console.log(data[0].attribs);
                            //console.log(link);
                            perfumeList.push(link);
                            i++;
                            if(i<5) setTimeout(function() {
                                console.log("Chiamo la prossima con 800ms di ritardo e i : " + i);
                                return getPerfumeListByBrandUrl(perfumeList, brandList, parseInt("" + i));
                            },3000);
                            else {
                                console.log("Ho finito la lista ad indice " + i  + " percio scrivo sul file");
                                setTimeout(function() {
                                    fs.writeFile('perfumes.json', JSON.stringify(perfumeList, null, 4), function(err){ 
                                    
                                        return perfumeList;
                                    });
                                })
                                
                            }
                        } else {
                            console.log("Il link non rispetta le condizioni");
                            return getPerfumeListByBrandUrl(perfumeList, brandList, parseInt("" + i));
                            //console.log(data);
                        }
                    });
                } catch(err) {
                    console.log("Si è verificato un errore in getPerfumeListByBrandUrl con i : " + i + " e url : " + brandList[i].likn);
                }
    
                   // return perfumeList;
                });
            } catch(e) {
                
            }
            

        
    }


    

    /* INSERIMENTO DI UN SINGOLO PROFUMO NEL DB */
    var insertSinglePerfume = function(perfume) {
        var newPerfume = new Perfume(perfume);
        newPerfume.save(function(err, addedPerfume) {
            if (err) console.log("Si è verificato un errore durante l'inserimento del profumo " + perfume.name);
            else console.log(perfume.name + " inserito correttamente");
        });
    }

    

    var insertPerfumeListNew = function(fileName) {
         fs.readFile(fileName, 'utf8',function read(err, data) {
            if (err) {
                console.log(err);
            }
            content = removeDuplicates(JSON.parse(data), "name");
            console.log("Lunghezza di content senza duplicati : " + content.length);
            for(var i=0; i<content.length; i++) {
                insertSinglePerfume(content[i]);
            }
        
        });
    }





    var optionsNew = {
        "url" : "",
        "headers" : {
            "authority" : "www.fragrantica.it",
            "method" : "GET",
            "path" : "/perfume/",
            "scheme" : "https",
            "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "accept-language" : "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control" : "max-age=0",
            "cookie" : "__cfduid=db27d32633395ee40053c3085b4ce5dfd1528047210; _ga=GA1.2.164629286.1528047213; OX_plg=pm; rtgobrt=pollux; _gid=GA1.2.988974857.1528351492; frecently=a%3A3%3A%7Bi%3A191%3Bi%3A1528437742%3Bi%3A39849%3Bi%3A1528047484%3Bi%3A47837%3Bi%3A1528047368%3B%7D; XSRF-TOKEN=eyJpdiI6IkZtKzM5aEhxbWdDSnRveUN5QytLY1E9PSIsInZhbHVlIjoibGY0bnFBTTFlU2RVcmpJXC9GZWRcLzNVN3gwbmFzVEpHV0o4Zk52Zmk4bUpHSHJDTFlBR3luMDVuZ1pXQml4b0VlNzJYdEllYXczd1wvOHdlUjJGbVVCbnc9PSIsIm1hYyI6IjBkOTM3NTU2ODdiZDZlOTUyNTc5YjM2NDNkMTgzMTcyN2RmNmUyNzAzZDM5ODAzY2ZjYjhlYmIxZDU2ODk4ZDMifQ%3D%3D; laravel_session=eyJpdiI6IkpSYzd1cXE4XC9rTzZGdmErc2diXC9EUT09IiwidmFsdWUiOiJOQ0YwMXB5THZUYW1FYm0wdVdUNldBUElqZzdUSzVHVldFTkFlNWoxUENsd0VYc3RRYVdSbUVUbmVITVdCWGRMdURIc1FTNTNyZkxjbXlcLzlUOGdidWc9PSIsIm1hYyI6Ijg2MTMyZmNlZjcwYjE1MDk1MWI3YjJjZjU4Nzc2YWQ0NmFiYmFhYTUwYjhkNTI1YjJiNTViNGQwNTM5YjQ5Y2MifQ%3D%3D; OX_sd=12; __atuvc=1%7C23; __atuvs=5b1a7103d5be74d6000",
             "upgrade-insecure-requests" : "1",
            "user-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
        }
    }





let LOG = "";

app.get('/api/scrapeperfumelist', function(req, res){ 
        fs.readFile('brands-new-' + 1 + '.json', 'utf8',function read(err, data) {
            if (err) {
                console.log(err);
            }
            content = JSON.parse(data); 
            console.log("adesso invio la lista di brand url alla funzione getPerfumeList, primo elemento : ");
            console.log(content[0]);
            setTimeout(function() {
                    console.log("Ok, chiamo  , content length : " + content.length);
                    getNew(content, 461);
            },1000);
            
        });
    });

var getNew = function(brandList, startIndex) {
    let i = startIndex;
    let perfumeList = [];
    let interval = setInterval(function() {
        if(brandList[i].likn) {
        optionsNew.url = brandList[i].likn;
        console.log("Chiamata all'url : " + optionsNew.url);
        request(optionsNew, function(error, response, html){ 
            console.log("Risposta arrivata")
            let added = false;
            var $ = cheerio.load(html);
            var res = $('a').filter(function() {
                let cheerioHref = $(this);
                if(cheerioHref && cheerioHref[0] && cheerioHref[0].attribs && cheerioHref[0].attribs.href && cheerioHref[0].attribs.href.startsWith("/perfume/"))
                {

                    perfumeList.push({
                        "brand" : brandList[i].name,
                        "brandUrl" : brandList[i].likn,
                        "name" : cheerioHref[0].children[1].data,
                        "url" : cheerioHref[0].attribs.href,
                        "thumb" : cheerioHref[0].children[0].attribs.src
                    });
                    added = true;
                    console.log("perfumeList.length : " + perfumeList.length);
                }
            });
            i++;
            if(!added || i>brandList.length-1) {
                console.log("Sono arrivato al capolinea, perfumeList.length : " + perfumeList.length);
                

                fs.writeFile('perfumesNew-LastIndex.txt', ("" + i), function(err){
                    console.log("Salvato l'ultimo indice della lista profumi")
                    fs.writeFile('perfumesNew-1c.json', JSON.stringify(perfumeList, null, 4), function(err){ 
                        console.log("Scrittura completata con successo");
                        clearInterval(interval);
                        return;
                    });
                });

                
            } 
        });

    } else {
        //.likn non presente 
        i++;
            if(i>brandList.length-1) {
                console.log("Sono arrivato al capolinea, perfumeList.length : " + perfumeList.length);
                fs.writeFile('perfumesNew-1c.json', JSON.stringify(perfumeList, null, 4), function(err){ 
                    console.log("Scrittura completata con successo");
                    clearInterval(interval);
                    return;
                });

            } 
    }

    }, 10000);
}
   



































    app.get('/api/scrape', function(req, res){
        console.log("chiamo getperfumelist")
        //getBrandList();


        var options = {
            "url" : "https://www.fragrantica.it/notes/",
            "headers" : {
                "authority" : "www.fragrantica.it",
                "method" : "GET",
                "path" : "/notes/",
                "scheme" : "https",
                "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
               
                "accept-language" : "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control" : "max-age=0",
                "cookie" : "__cfduid=dd44d4ad7eff72c7dbe9decd1d9f574101528099838; rtgobrt=castor; _ga=GA1.2.1607424826.1528099840; _gid=GA1.2.912984641.1528099840; OX_plg=pm; __atuvc=1%7C23",
                "if-modified-since" : "Mon, 04 Jun 2018 09:35:44 GMT",
                "referer" : "https://www.fragrantica.it/search-notes/",
                "upgrade-insecure-requests" : "1",
                "user-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
            }
        }


        request(options, function(error, response, html){
            let jsonList = [];
            if(!error){

            console.log("Scrape correctly called");
            var $ = cheerio.load(html);
            var name, thumb;
            var json = { "name" : "", "thumb" : ""};
            $('.notebox').filter(function(){
                //console.log("notebox divs found");
                var data = $(this);
                name = data.children().first()[0].children[1].data;
              
                
                thumb = data.children().first()[0].children[0].attribs.src;
        
                json.name = name;
                json.thumb = thumb;
                jsonList.push(JSON.parse(JSON.stringify(json)));
            })
            
        } else {
            console.log("Errore nella request");
            console.log(error);
        }

            
            }) ;
        })






        








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
                fileToJson("perfumesNew.json").then(
                function(success, err) {
                    if(err) console.log("Errore");
                    else {
                        console.log("Lettura completata con successo, risultato : ");
                        console.log(success);
                        res.json(success);
                    }
                });
        });



	app.get('*', function(req, res) {
			res.sendfile('./public/perfumenotes/www/index.html');
	});

};
