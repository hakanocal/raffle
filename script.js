document.getElementById("insertedItemsArea").placeholder = "Donald Trump\nAngela Merkel\nVladimir Putin\nRecep Tayyip Erdoğan\nEmmanuel Macron\nNicolás Maduro\nPapa Franciscus\nKim Jong-un\nBenyamin Netanyahu\nRam Nath Kovind\nBoris Johnson";
document.getElementById("winnerCount").innerHTML = "1"



var wordArray = []
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var n = allText.split("\n");
                for(var x in n){   
                    wordArray.push((n[x].trim()));
                }
            }
        }
    }
    rawFile.send(null);
}
readTextFile("wordninja_words.txt");


function loadFileAsText(){
    var fileToLoad = document.getElementById("fileToLoad").files[0];
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result; 
        var fileName = document.getElementById("fileToLoad").files.item(0).name;    //read.txt      /read.csv 
        var fileSize = document.getElementById("fileToLoad").files.item(0).size;
        var fileType = document.getElementById("fileToLoad").files.item(0).type;    //text/plain    /application/vnd.ms-excel
        var itemArray = [];
        if (fileType == "text/plain" || fileName.split('.').pop() == "txt"){
            document.getElementById("insertedItemsArea").innerHTML = "";
            var n = textFromFileLoaded.split("\n");
                for(var x in n){   
                    itemArray.push((n[x].trim()));
            }
            for (var i = 0; i< itemArray.length; i++){
                document.getElementById("insertedItemsArea").innerHTML += itemArray[i] + "\n";
            }
            document.getElementById("itemCount").innerHTML = itemArray.length;
        }
        else if (fileName.split('.').pop() == "csv"){
            document.getElementById("insertedItemsArea").innerHTML = "";
            var n = textFromFileLoaded.split(",");
                for(var x in n){   
                    itemArray.push((n[x].trim()));
            }
            for (var i = 0; i< itemArray.length; i++){
                document.getElementById("insertedItemsArea").innerHTML += itemArray[i] + "\n";
            }
            document.getElementById("itemCount").innerHTML = itemArray.length;
        }
        else if (fileSize > 5242880){
            alert('5MB ve altındaki dosyaları yükleyebilirsiniz')
        }
        else{
            alert('dosya türünü kontrol edin')
        }
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}