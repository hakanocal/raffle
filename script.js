document.getElementById("insertedItemsArea").placeholder = "Donald Trump\nAngela Merkel\nVladimir Putin\nRecep Tayyip Erdoğan\nEmmanuel Macron\nNicolás Maduro\nPapa Franciscus\nKim Jong-un\nBenyamin Netanyahu\nRam Nath Kovind\nBoris Johnson";
document.getElementById("winnerCount").innerHTML = "1"

var copied;
var _copy;
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
    document.getElementById("copyWinners").innerHTML = "KOPYALA";
    _copy = "KOPYALA";
    copied = "KOPYALANDI";

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
    document.getElementById("copyWinners").innerHTML = "COPY";
    _copy = "COPY";
    copied = "COPIED";
}
var userLang = navigator.language || navigator.userLanguage; 
if (userLang == "tr-TR" || userLang == "tr"){
    langTR();
}
else{
    langEN();
}
var itemArray = [];
function loadFileAsText(){
    var fileToLoad = document.getElementById("fileToLoad").files[0];
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result; 
        var fileName = document.getElementById("fileToLoad").files.item(0).name;    //read.txt      /read.csv 
        var fileSize = document.getElementById("fileToLoad").files.item(0).size;
        var fileType = document.getElementById("fileToLoad").files.item(0).type;    //text/plain    /application/vnd.ms-excel
        console.log(fileName + fileSize + fileType)
        if (fileType == "text/plain" || fileName.split('.').pop() == "txt"){
            document.getElementById("insertedItemsArea").value = "";
            var n = textFromFileLoaded.split("\n");
            itemArray = [];
            for(var x in n){   
                if (n[x] == "\n" || n[x] == ""  || n[x] == " " || n[x] == "\r"){
                    continue
                }
                else{
                    itemArray.push((n[x].trim()));
                    document.getElementById("itemCount").innerHTML = itemArray.length;
                } 
            }
            for (var i = 0; i< itemArray.length; i++){
                document.getElementById("insertedItemsArea").value += itemArray[i] + "\n";
            }
            document.getElementById("itemCount").innerHTML = itemArray.length;
        }
        else if (fileName.split('.').pop() == "csv"){
            document.getElementById("insertedItemsArea").value = "";
            var n = textFromFileLoaded.split(",");
            itemArray = [];
            for(var x in n){   
                if (n[x] == "\n" || n[x] == ""  || n[x] == " " || n[x] == "\r"){
                    continue
                }
                else{
                    itemArray.push((n[x].trim()));
                    document.getElementById("itemCount").innerHTML = itemArray.length;
                } 
            }
            for (var i = 0; i< itemArray.length; i++){
                document.getElementById("insertedItemsArea").value += itemArray[i] + "\n";
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
function clearItems(){
    itemArray = [];
    document.getElementById("itemCount").innerHTML = itemArray.length;
    document.getElementById("insertedItemsArea").value = "";
    document.getElementById("insertedItemsArea").focus();
}
function clearWinners(){
    document.getElementById("winnersItemsArea").value = "";
    checkLines();
}


document.getElementById("winnerCount").value = 1;

function checkLines(){
    itemArray = [];
    var items = document.getElementById("insertedItemsArea").value;
    var n = items.split("\n");
    for(var x in n){  
        if (n[x] == "\n" || n[x] == ""  || n[x] == " "){
            continue
        }
        else{
            itemArray.push((n[x].trim()));
            document.getElementById("itemCount").innerHTML = itemArray.length;
        } 
    }
    document.getElementById("itemCount").innerHTML = itemArray.length;
}

function drawWinners(){
    var winnerCount = document.getElementById("winnerCount").value;
    var winners = [];
    while(winners.length < winnerCount){
        var winner = Math.floor(Math.random() * itemArray.length) ;
        if(winners.indexOf(itemArray[winner]) === -1){
            winners.push(itemArray[winner]);
            itemArray.splice(winner, 1);
        } 
    }
    // alert("item array: " + itemArray)
    // alert("kazananlar:" + winners)
    var n = winners;
    for(var x in n){  
        document.getElementById("winnersItemsArea").value += n[x] + "\n"; 
    }
}
var myVar;
var kopyala = true;
function copy(){
    if (kopyala){
        kopyala = false;
        var copyText = document.getElementById("winnersItemsArea");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        document.getElementById("copyWinners").innerHTML = copied;
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.selection) {document.selection.empty();}
        myVar = setTimeout(sil, 1000);
        function sil(){
            document.getElementById("copyWinners").innerHTML = _copy;
            kopyala = true;
        }
    }
    else{

    }
}
function checkWinnnersDrawCount(){
    document.getElementById("winnerCount").value = document.getElementById("winnerCount").value.replace(/[^0-9.]/g, ''); 
    document.getElementById("winnerCount").value = document.getElementById("winnerCount").value.replace(/(\..*)\./g, '$1');
    console.log(document.getElementById("itemCount").innerHTML);
    console.log(document.getElementById("winnerCount").value);
    console.log("******")
    if (parseInt(document.getElementById("itemCount").innerHTML) < document.getElementById("winnerCount").value || document.getElementById("winnerCount").value == ""){
        document.getElementById("winnerCount").style.borderColor = "red";
        document.getElementById("winnerCount").style.color = "red";
        document.getElementById("drawbuttontext").disabled = true;
        
    }
    else{
        document.getElementById("winnerCount").style.borderColor = "grey";
        document.getElementById("winnerCount").style.color = "black";
        document.getElementById("drawbuttontext").disabled = false;
    }
}