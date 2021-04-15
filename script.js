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
        checkWinnnersDrawCount();

    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}
function clearItems(){
    itemArray = [];
    document.getElementById("itemCount").innerHTML = itemArray.length;
    document.getElementById("insertedItemsArea").value = "";
    checkWinnnersDrawCount();
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
    clearWinners();
    var winnerCount = document.getElementById("winnerCount").value;
    var winners = [];
    while(winners.length < winnerCount){
        var winner = Math.floor(Math.random() * itemArray.length) ;
        winners.push(itemArray[winner]);
        itemArray.splice(winner, 1);
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
        document.getElementById("copyWinners").style.backgroundColor = "#0366d6";
        document.getElementById("copyWinners").style.color = "#fff";
        function sil(){
            document.getElementById("copyWinners").innerHTML = _copy;
            kopyala = true;
            document.getElementById("copyWinners").style.backgroundColor = "#fafbfc";
            document.getElementById("copyWinners").style.color = "#0366d6";
        }
    }
    else{

    }
}
function checkWinnnersDrawCount(){
    document.getElementById("winnerCount").value = document.getElementById("winnerCount").value.replace(/[^0-9.]/g, ''); 
    document.getElementById("winnerCount").value = document.getElementById("winnerCount").value.replace(/(\..*)\./g, '$1');
    if (parseInt(document.getElementById("itemCount").innerHTML) < document.getElementById("winnerCount").value || document.getElementById("winnerCount").value == "" || document.getElementById("winnerCount").value == 0){
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





// <!DOCTYPE html>
// <html ondragstart="dragStart()" ondragend="dragStop()">
// <head>
// <style>
// #drop{
// width:200px;
// height:50px;
// border:1px dashed grey;
// }

// @keyframes dragdrop{
// 	from{
// 		transform: scale(1);					
// 	}
// 	to{
// 		transform: scale(1.05);					
// 	}
// }

// </style>

// </head>
// <body>

// <script>
// function dragStart(){
// 	console.log("Sürükleniyor ")
//     document.getElementById('drop').style.animation="dragdrop 0.6s linear 0s infinite alternate none running";
// }
// function dragStop(){
// 	document.getElementById("drop").style.animation = 'none';
//   	console.log("niye bıraktın olm")
// }
// function dragEnter(){
// 	console.log("enter oldu")
// }
// function onDrop(ev){
//   console.log('File(s) dropped');
//   ev.preventDefault();
//   if (ev.dataTransfer.items) {
//     // Use DataTransferItemList interface to access the file(s)
//     for (var i = 0; i < ev.dataTransfer.items.length; i++) {
//       // If dropped items aren't files, reject them
//       if (ev.dataTransfer.items[i].kind === 'file') {
//         var file = ev.dataTransfer.items[i].getAsFile();
//         console.log('... file[' + i + '].name = ' + file.name);
//       }
//     }
//   } else {
//     // Use DataTransfer interface to access the file(s)
//     for (var i = 0; i < ev.dataTransfer.files.length; i++) {
//       console.log('... file[' + i + '].name = ' + 						             ev.dataTransfer.files[i].name);
//     }
//   }

// }
// function Prevent(event){
// 	event.preventDefault();	
// }

// </script>


// <div id="drop" ondragenter="dragEnter()" ondrop="onDrop(event)" ondragover="Prevent(event)" > </div>
// <br>
// <div draggable="true"  >Javascript Eğitim Seti</div>


// </body>
// </html>



/* -------------------------------------------------- */



// <!DOCTYPE html>
// <html id="drop-zone">
// <body >

// <h1 id="myH"></h1>
// <p id="myP"></p>
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
// <script>
// $(document).on('dragenter', '#drop-zone', function(ev) {
//   $(ev.target).html("ANİMASYON VAR");
// });

// $(document).on('dragleave', '#drop-zone', function(ev) {
//   $(ev.target).html('SÜRÜKLE KARDEŞİM ANİMASYON YOK');
// });

// $(document).on('dragstop', '#drop-zone', function(ev) {
//   $(ev.target).html("STOP ETTİM");
// });
// </script>

// <div >SÜRÜKLE KARDEŞİM ANİMASYON YOK</div>

// </body>
// </html>

