

//Xử lí denine button
function denine_button(event){
    var a = event.target.parentNode.parentNode.id;

    const formdata = new FormData();
    formdata.append("st", "denined");
    formdata.append("id", a);
    url = "/friends/denine_friendrequest/";

    fetch(url,{
        method:'POST',
        body: formdata,
    })


    if(event.target.textContent === "Từ chối") {
        event.target.textContent = "Đã từ chối";
    }
}

//xử lí accept button
function accept_button(event){
    if(event.target.textContent === "Xác nhận") {
        event.target.textContent = "Đã xác nhận";
        event.target.style.backgroundColor = '#B8BABE';
    }
    var a = event.target.parentNode.parentNode.id;

    var formdata = new FormData();

    formdata.append("st", "accepted");
    formdata.append("id", a);
    url = "/friends/accept_friendrequest/"
    fetch(url,{
        method:'POST',
        body: formdata,
    })
}

//xử lí lời mời kết bạn
var request_list = document.querySelector(".request-list");
url_addfriend = "/friends/get_receivedfriendrequest/";
function addfriend() {
    fetch(url_addfriend)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.data.forEach(function(request){
            if(request.friend_request_received.status === "pending"){
                var a = `<div class="card1" id="${request.friend_request_received.id}">
                <div class="card1-img">
                    <img style="object-fit: cover;width: 100%;height: 100%;" src="${request.friend_request_profile.avatar}" alt="Card Image" >
                </div>
                <div class="card1-content">
                    <h3>${request.friend_request_profile.name}</h3>
                </div>
                <div class="card1-button">
                    <button class="button1" onclick="accept_button(event)">Xác nhận</button>
                    <button class="button2" onclick="denine_button(event)">Từ chối</button>
                </div>
            </div>`;
            var newDiv = document.createElement("div");
            newDiv.innerHTML = a;
    
            request_list.appendChild(newDiv);
            }
        })
    })
}

addfriend();


