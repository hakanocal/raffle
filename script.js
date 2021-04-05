document.getElementById("insertedItemsArea").placeholder = "Donald Trump\nAngela Merkel\nVladimir Putin\nRecep Tayyip Erdoğan\nEmmanuel Macron\nNicolás Maduro\nPapa Franciscus\nKim Jong-un\nBenyamin Netanyahu\nRam Nath Kovind\nBoris Johnson";
document.getElementById("winnerCount").innerHTML = "1"


function langTR(){
    document.getElementById("drawbuttontext").style.order = "5";
    document.getElementById("winnerCount").style.order = "3";
    document.getElementById("winnerfromtext").style.order = "4";
    document.getElementById("itemCount").style.order = "1";
    document.getElementById("participantstext").style.order = "2";

    document.getElementById("drawbuttontext").innerHTML = "ÇEK";
    document.getElementById("winnerfromtext").innerHTML = "kazanan";
    document.getElementById("itemCount").innerHTML = "0";
    document.getElementById("participantstext").innerHTML = "katılımcı arasından";

    document.getElementById("clearItems").innerHTML = "TEMİZLE";
    document.getElementById("clearWinners").innerHTML = "TEMİZLE";
    document.getElementById("enterSeperatedNames").innerHTML = "İsimleri satırlar ile ayırarak girin:";
    document.getElementById("winners").innerHTML = "Kazananlar:";
    document.getElementById("headerTitle").innerHTML = "YENİ BİR ÇEKİLİŞ OLUŞTUR!";
    document.getElementById("dropyourfile").innerHTML = ".txt veya .csv formatlı dosyaları sürükle ve bırak";
}
function langEN(){
    document.getElementById("drawbuttontext").style.order = "1";
    document.getElementById("winnerCount").style.order = "2";
    document.getElementById("winnerfromtext").style.order = "3";
    document.getElementById("itemCount").style.order = "4";
    document.getElementById("participantstext").style.order = "5";

    document.getElementById("drawbuttontext").innerHTML = "DRAW";
    document.getElementById("winnerfromtext").innerHTML = "winner from";
    document.getElementById("itemCount").innerHTML = "0";
    document.getElementById("participantstext").innerHTML = "participants";

    document.getElementById("drawbuttontext").innerHTML = "DRAW";
    document.getElementById("winnerfromtext").innerHTML = "winner from";
    document.getElementById("itemCount").innerHTML = "0";
    document.getElementById("participantstext").innerHTML = "participants";

    document.getElementById("clearItems").innerHTML = "CLEAR";
    document.getElementById("clearWinners").innerHTML = "CLEAR";
    document.getElementById("enterSeperatedNames").innerHTML = "Enter names separated by newlines:";
    document.getElementById("winners").innerHTML = "Winners";
    document.getElementById("headerTitle").innerHTML = "CREATE NEW RAFFLE NOW!";
    document.getElementById("dropyourfile").innerHTML = "Drop your .txt or .csv files here";
}
var userLang = navigator.language || navigator.userLanguage; 
if (userLang == "tr-TR" || userLang == "tr"){
    langTR();
}
else{
    langEN();
}
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