function showPopup(){
    let overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    document.forms[0]["room-name"].value = "";
    document.forms[0]["department"].value = "";
    document.forms[0]["type"].value = "";
    document.getElementById("location").selectedIndex = 0;
    document.getElementById("room_number").value = "";
    document.forms[0]["date"].value = "";
    document.getElementById("timeStart").value = "";
    document.getElementById("timeEnd").value = "";
    document.forms[0]["duration"].value = "";

}
function hidePopup(){
    let overlay = document.getElementById("overlay");
    overlay.style.display = "none";
}

function validInput(roomName, departmentName, roomType, date, startTime, endTime, location1, location2, Duration){
    // Department name can only be English letters, Room name should be a combination of letters and numbers
    let roomNameRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/);
    let departmentNameRegex1 = new RegExp(/^[A-Za-z]+\s+[A-Za-z]+$/);
    let departmentNameRegex2 = new RegExp(/^[A-Za-z]+$/);
    let TimeRegex = new RegExp(/^[0-9]{2}:[0-9]{2}$/);
    let durationRegex = new RegExp(/^[0-9]+$/);
    if (roomName == null || roomName === "") {
        alert("Please input room name.");
        return false;
    }
    if (!roomNameRegex.test(roomName)) {
        alert("Invalid room name.");
        return false;
    }
    if (roomType === "") {
        alert("Please select room type.");
        return false;
    }
    if (departmentName == null || departmentName === "") {
        alert("Please input department name.");
        return false;
    }
    if (!departmentNameRegex1.test(departmentName)&&!departmentNameRegex2.test(departmentName)) {
        alert("Invalid department name.");
        return false;
    }
    let today = new Date().getTime(),
        iDate = date.split("-");
    iDate = new Date(iDate[0], iDate[1]-1, iDate[2]).getTime();
    if ((iDate - today) <= 0) {
        alert("Invalid date.");
        return false;
    }
    if (startTime == null || startTime === "") {
        alert("Please input start time.");
        return false;
    }
    if (!TimeRegex.test(startTime)) {
        alert("Invalid start time.");
        return false;
    }
    if (endTime == null || endTime === "") {
        alert("Please input end time.");
        return false;
    }
    if (!TimeRegex.test(endTime)) {
        alert("Invalid end time.");
        return false;
    }
    if (startTime > endTime) {
        alert("Invalid time range.");
        return false;
    }
    if (location1 === "null") {
        alert("Please input building.");
        return false;
    }
    if (location2 == null || location2 === "") {
        alert("Please input room number.");
        return false;
    }
    if (Duration == null || Duration === "") {
        alert("Please input duration.");
        return false;
    }
    if (!durationRegex.test(Duration)) {
        alert("Invalid duration.");
        return false;
    }
    return true;
}

let editingRow = null;
function onClickSubmit(){
    let roomName = document.forms[0]["room-name"].value;
    let departmentName = document.forms[0]["department"].value;
    let date = document.forms[0]["date"].value;
    let startTime = document.getElementById("timeStart").value;
    let endTime = document.getElementById("timeEnd").value;
    let location1 = document.getElementById("location").value;
    let location2 = document.getElementById("room_number").value;
    let Duration = document.forms[0]["duration"].value;
    let roomType = document.getElementsByName('type');
    let roomTypeChecked = false;
    for (let i = 0; i < roomType.length; i++) {
        if (roomType[i].checked) {
            roomType = roomType[i].value;
            roomTypeChecked = true;
            break;
        }
    }
    if (!roomTypeChecked) {
        roomType = "";
    }
    // addRow(roomName, departmentName, date, roomType, startTime, endTime, location1, location2, Duration);
    // hidePopup();
    if(validInput(roomName, departmentName, roomType, date, startTime, endTime, location1, location2, Duration)){
        if (!editingRow) {
            addRow(roomName, departmentName, date, roomType, startTime, endTime, location1, location2, Duration);
        }
        else{
            updateRow(editingRow, roomName, departmentName, date, roomType, startTime, endTime, location1, location2, Duration);
            editingRow = null;
        }
        hidePopup();
    }
}

function updateRow(row, roomName, departmentName, date, roomType, startTime, endTime, location1, location2, Duration) {
    let cells = row.getElementsByTagName('td');
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    cells[0].innerHTML = roomName;
    cells[1].innerHTML = departmentName;
    cells[2].innerHTML = roomType;
    cells[3].innerHTML = location1 + '<br>' + location2;
    cells[4].innerHTML = year+"/"+month+"/"+day;
    cells[5].innerHTML = startTime;
    cells[6].innerHTML = endTime;
    cells[7].innerHTML = Duration+"h";
}

function addRow(roomName, departmentName, date, roomType, startTime, endTime, location1, location2, Duration) {
    let bodyObj = document.getElementById("tbody");
    if (!bodyObj) {
        alert("Body of Table not Exist!");
        return;
    }
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    let rowCount = bodyObj.rows.length;
    let cellCount = bodyObj.rows[0].cells.length;
    bodyObj.style.display = ""; // display the tbody
    let newRow = bodyObj.insertRow(rowCount++);
    newRow.insertCell(0).innerHTML = roomName;
    newRow.insertCell(1).innerHTML = departmentName;
    newRow.insertCell(2).innerHTML = roomType;
    newRow.insertCell(3).innerHTML = location1 + '<br>' + location2;
    newRow.insertCell(4).innerHTML = year+"/"+month+"/"+day;
    newRow.insertCell(5).innerHTML = startTime;
    newRow.insertCell(6).innerHTML = endTime;
    newRow.insertCell(7).innerHTML = Duration+"h";
    newRow.insertCell(8).innerHTML = bodyObj.rows[0].cells[cellCount - 1].innerHTML; // copy the "delete" button
    bodyObj.rows[0].style.display = "none"; // hide first row
}

function onClickDelete(inputting) {
    if (!inputting) return;
    let parentTD = inputting.parentNode;
    let parentTR = parentTD.parentNode;
    let parentTBODY = parentTR.parentNode;
    parentTBODY.removeChild(parentTR);
}

function onClickEdit(inputObj){
    if (!inputObj) return;
    editingRow = inputObj.parentNode.parentNode;
    let tr = inputObj.parentNode.parentNode;
    let cells = tr.getElementsByTagName('td');
    document.forms[0]["room-name"].value = cells[0].innerText;
    document.forms[0]["department"].value = cells[1].innerText;
    document.forms[0]["type"].value = cells[2].innerText;
    let locationSelect = document.getElementById("location");
    let locationValue = cells[3].innerText.split("\n")[0];
    for (let i = 0; i < locationSelect.options.length; i++) {
        if (locationSelect.options[i].text === locationValue) {
            locationSelect.selectedIndex = i;
            break;
        }
    }
    document.getElementById("room_number").value = cells[3].innerText.split("\n")[1];
    let year = cells[4].innerText.split("/")[0];
    let month = cells[4].innerText.split("/")[1];
    let day = cells[4].innerText.split("/")[2];
    document.forms[0]["date"].value = year+"-"+month+"-"+day;
    document.getElementById("timeStart").value = cells[5].innerText;
    document.getElementById("timeEnd").value = cells[6].innerText;
    document.forms[0]["duration"].value = cells[7].innerText.split("h")[0];
    let overlay = document.getElementById("overlay");
    overlay.style.display = "block";
}

let imageIndex = 1;
const images = ['https://liveimages.videocc.net/uploaded/images/2022/07/gbrdf8rnqv.jpg', 'https://pic2.zhimg.com/v2-b9e8c828ea429967339f6dff9d6ec0ae_r.jpg']; // 替换为你的图片URL
function switchBackground() {
    const css = `body::after {background: url(${images[imageIndex]}) no-repeat center; background-size: cover;}`;
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    imageIndex = (imageIndex + 1) % images.length;
}