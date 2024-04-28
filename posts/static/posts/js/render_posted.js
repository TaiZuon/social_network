
//lấy bài đăng
const params = (new URL(document.location)).searchParams;
const url_user_post = '/userprofiles/get_posts/?id=' + ((params.get('id') !== null) ? params.get('id') : '');
const url_homepage_post = '/homepage/get_posts/';

const url_get_posts = (window.location.pathname == '/userprofiles/') ? url_user_post : url_homepage_post;

const posted_area = document.querySelector(".posted_area");

const baseUrl = document.body.getAttribute('data-base-url');

//xử lí hover react_btn    
// var a = event.target.parentNode.parentNode.querySelector(".list_reaction");
// a.classList.toggle(".show_list_reaction");


function get_posts(){
    fetch(url_get_posts)
    .then(response => response.json())
    .then(data => {
        render_post(data,"old");
        console.log(data);
    })
}

//render_post
export function render_post(data,isOld){
    data.posts.forEach(function(post, index){
        setTimeout(function() {
            var newDiv = 
                `<div class="status-field-container write-post-container" id="${post.id}">
                <div class="user-profile-box">
                    <div class="user-profile">
                        <a href="/userprofiles/?id=${post.user.id}" style="text-decoration: none;">
                            <img src="${post.user.avatar}" alt="">
                        </a>
                        <div>
                            <div style="display: flex; align-items: center;">
                            <div id="name-user-of-post">
                                <a href="/userprofiles/?id=${post.user.id}" style="text-decoration: none;">
                                <p>${post.user.name}</p>
                                </a>
                            </div>
                            <div
                                id="title-of-posts"
                                class="title-posts"
                                style="padding-top: 4px;"
                            >
                                <small style="font-size: 13px; margin-left: 5px">
                                ${((post.title) ? post.title : "")}
                                </small>
                            </div>
                            </div>
                            <small>${post.created_at}</small>
                        </div>
                    </div>

                    <div>
                        <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                    </div>
                </div>
                <div class="status-field">
                    <p>${(post.content !== undefined && post.content !== null && post.content !== "") ? post.content : ""}</p>
                    <div class="gallery-container">
                    </div>
                </div>
                
                <div class="count-reactionPost" id="count-reaction-${post.id}">
                    <div>
                        <p id="count-reaction-posts-${post.id}">120</p>
                    </div>
                </div>

                <div class="post-reaction">
                    <div class="activity-icons">
                        <div onmouseover="show_list_reaction_for_post(event)" onclick="delete_reaction_for_post(event)">
                            <img src="${baseUrl + "images/like3.png"}" id="reaction_img_${post.id}" alt="" status="default"> 
                        </div>
                        <div><img src="${baseUrl + "images/comment.png"}" alt="">Comments</div>
                        <div><img src="${baseUrl + "images/share0.png"}" alt="">Share</div>
                    </div>

                    <div class="post-profile-picture">
                        <img src="${post.user.avatar}" alt=""> <i class=" fas fa-caret-down"></i>
                    </div>

                    <div class="list_reactionPost">
                        <div class="reaction_btnPost" onclick="create_reaction_for_post(event)">
                            <img class="love" src="${baseUrl + "images/love.png"}">
                        </div>
                        <div class="reaction_btnPost" onclick="create_reaction_for_post(event)">
                            <img class="like" src="${baseUrl + "images/like.png"}">
                        </div>
                        <div class="reaction_btnPost" onclick="create_reaction_for_post(event)">
                            <img class="care" src="${baseUrl + "images/care.png"}">
                        </div>
                        <div class="reaction_btnPost" onclick="create_reaction_for_post(event)">
                            <img class="haha" src="${baseUrl + "images/haha.png"}">
                        </div>
                        <div class="reaction_btnPost" onclick="create_reaction_for_post(event)">
                            <img class="wow" src="${baseUrl + "images/wow.png"}">
                        </div>
                        <div class="reaction_btnPost" onclick="create_reaction_for_post(event)">
                            <img class="sad" src="${baseUrl + "images/sad.png"}">
                        </div>
                        <div class="reaction_btnPost" onclick="create_reaction_for_post(event)">
                            <img class="angry" src="${baseUrl + "images/angry.png"}">
                        </div>
                    </div>

                </div>
            </div>`
            var posted = document.createElement("div");
            posted.innerHTML = newDiv;

            if(isOld === "old"){
                posted_area.appendChild(posted);
            }
            else{
                var a = posted_area.children[0];
                posted_area.insertBefore(posted, a);
            }
            
            setCountReaction_for_post("posts", post.id);
            is_reacted_for_post(post.id);

            var galleryContainerElement = posted.querySelector('.gallery-container');
            createLayoutImages(post.media, galleryContainerElement, post.id);
        }, 500 * index);

    })

}

get_posts();
