const main_container = document.getElementById('main-container');

//lấy bài đăng
const api_get_posts_for_userprofilepage = '/homepage/get_posts/';
const api_get_comments_for_posts = '/comments/get_comments_for_post/';
const api_get_comments_for_comment = '/comments/get_comments_for_comment/';
const api_get_profile_basic = '/userprofiles/get_profile_basic/';
const api_get_reactions = '/reactions/get_reactions/'
const api_create_reaction = '/reactions/create_reaction/'
const api_delete_reaction = '/reactions/delete_reaction/'
const api_is_reacted = '/reactions/is_reacted/'

const posts_lists = [];

var USERPROFILE = {};

function get_userprofile() {
    fetch(api_get_profile_basic)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        USERPROFILE.id = data.user_id;
        USERPROFILE.name = data.name;
        USERPROFILE.avatar = data.avatar;
    })

}

function get_posts(){
    fetch(api_get_posts_for_userprofilepage)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        render_post(data,"old");
    })
}

function render_post(data,old) {
    data.posts.forEach(post => {

        posts_lists.push(post);

        var posts_id = post.id;
        var content = post.content;
        var created_at = post.created_at;
        var user_id = post.user.id;
        var user_name = post.user.name;
        var images = (post.media[0]) ? post.media[0].media : "";
        var post = `<div class="${posts_id} posts-container" id="posts-${posts_id}" style="border: solid rgb(163, 162, 162); margin: 5px;">
                        <div class="post-box">
                            <div class="post" style="display: flex;">
                                <div class="post-header" style="margin: 5px 5px;">
                                    <div class="post-author">
                                        <p class="name" >${user_name} : </p>
                                    </div>
                                </div>
                                <div class="post-content" style="margin: 5px 5px;">
                                    <p class="content">${content}</p>
                                    <img src="${images}" alt="" style="width: 100px; height: 100px;">
                                </div>
                            </div>
                        </div>

                    <div class="reaction-container" style="display: flex;">
                        <p id="count-reaction-posts-${posts_id}" style="margin: 5px; padding: 0;">100</p>
                        <button id="react-btn-posts-${posts_id}" type="button" class="of-posts" posts_id="${posts_id}" style="margin: 5px;" onclick="sendReaction(event)">like</button>
                    </div>

                    <div class="comment-container">

                        <div id="active-comment">
                            <button id="active-comment-of-posts-btn-${posts_id}" onclick="show_commented_of_posts(event)">show commented</button>
                        </div>
            
                        <div id="commented-of-posts-box-${posts_id}" style="display: none;"></div>
                        
                        <div id="comment-for-posts-container" style="margin-top: 10px;">
                            <form action="/comments/create_comment/" method="post" id="send-comment-for-posts-${posts_id}">
                                <input type="text" name="content" id="content-comment-send">
                                <input type="submit" id="submit" value="comment">
                            </form>
                        </div>
                    </div>
        `;

        main_container.innerHTML += post;
    });

    data.posts.forEach(post => {
        var posts_id = post.id;

        var form = document.getElementById(`send-comment-for-posts-${posts_id}`);
        form.addEventListener('submit', function(event){
            event.preventDefault();
            console.log("submit");
            send_comment(event, posts_id, -1, "posts");
        });

        setCountReaction('posts', posts_id);

        isReacted('posts', posts_id);
    });
    
}

function send_comment(event, posts_id, comment_id, forwhat){
    console.log("send_comment_for" + forwhat);

    const content = event.target.content.value;
    event.target.content.value = "";
    // console.log(content);

    var user_id = "";
    var user_name = "";
    var user_avatar = "";

    fetch(api_get_profile_basic)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        user_id = data.user_id;
        user_name = data.name;
        user_avatar = data.avatar;
    })

    formData = new FormData();
    formData.append('content', content);
    formData.append('to_posts_id', posts_id);
    formData.append('to_comment_id', comment_id);
    formData.append('user_id', user_id);
    formData.append('user_name', user_name);
    formData.append('user_avatar', user_avatar);
    formData.append('csrfmiddlewaretoken', csrftoken);

    console.log(formData.get('to_posts_id'));

    idWhat = (forwhat === "posts") ? posts_id : comment_id;

    fetch('/comments/create_comment/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        render_comment(data, `commented-of-${forwhat}-box-${idWhat}`);
    })
}

function get_comments_for_post(posts_id, idElement){
    console.log("get_comments_for_post");

    formData = new FormData();
    formData.append('posts_id', posts_id);
    formData.append('csrfmiddlewaretoken', csrftoken);

    fetch(api_get_comments_for_posts, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        render_comment(data, idElement);
    })

}

function show_commented_of_posts(event){

    const posts_id = parseInt(event.target.classList[0]);
    console.log(posts_id);
    // console.log("clicked");
    posts_id_element = `commented-of-posts-box-${posts_id}`;

    var commented_box = document.getElementById(posts_id_element);
    // console.log(commented_box);

    // var active_comment = document.getElementById(`active-comment`);
    var active_comment_btn = document.getElementById(`active-comment-of-posts-btn-${posts_id}`);
    console.log(active_comment_btn);

    // if (commented_box.innerHTML !== ""){
    // } else {
    //     get_comments_for_post(posts_id, posts_id_element);
    // }
    commented_box.innerHTML = "";
    get_comments_for_post(posts_id, posts_id_element);
    

    if(commented_box.style.display === "none"){
        commented_box.style.display = "block";
        active_comment_btn.textContent = "hide commented";
    }
    else{
        commented_box.style.display = "none";
        active_comment_btn.textContent = "show commented";
    }
}

function get_comments_for_comment(comment_id, idElement){
    console.log("get_comments_for_comment");

    formData = new FormData();
    formData.append('comment_id', comment_id);
    formData.append('csrfmiddlewaretoken', csrftoken);

    fetch(api_get_comments_for_comment, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        render_comment(data, idElement);
    })
}

function show_commented_of_comment(event){

    const comment_id = parseInt(event.target.getAttribute('comment_id'));
    console.log(comment_id);
    // console.log("clicked");
    comment_id_element = `commented-of-comment-box-${comment_id}`;

    var commented_box = document.getElementById(comment_id_element);
    // console.log(commented_box);

    // var active_comment = document.getElementById(`active-comment`);
    var active_comment_btn = document.getElementById(`active-comment-of-comment-btn-${comment_id}`);
    console.log(active_comment_btn);

    // if (commented_box.innerHTML !== ""){
    // } else {
    //     get_comments_for_comment(comment_id, comment_id_element);
    // }
    commented_box.innerHTML = "";
    get_comments_for_comment(comment_id, comment_id_element);

    if(commented_box.style.display === "none"){
        commented_box.style.display = "block";
        active_comment_btn.textContent = "hide reply";
    }
    else{
        commented_box.style.display = "none";
        active_comment_btn.textContent = "show reply";
    }
}

function render_comment(data, idElement){ {

    data.comments.forEach(comment => {
        var comment_id = comment.id;
        var content = comment.content;
        var created_at = comment.created_at;
        var user = comment.user;

        var comment = `<div id="comment-${comment_id}" class="comment" style="display: flex; flex-direction: column; margin-left: 20px;">
                            <div class="comment-header">
                                <div class="comment-author" style="margin: 0px 0px; display: flex;">
                                    <img src="${user.avatar}" alt="" style="width: 20px; height: 20px;">
                                    <p class="name" style="margin: 0px 0px;" >${user.name} : </p>
                                </div>
                            </div>
                            <div class="comment-content" style="margin: 0px 0px; margin-left: 20px; display: inline;">
                                <p class="content" style="margin: 0px 0px;">${content}</p>
                            </div>

                            <div class="reaction-container" style="display: flex;">
                                <p id="count-reaction-comment-${comment_id}" style="margin: 5px; padding: 0;">100</p>
                                <button id="react-btn-comment-${comment_id}" type="button" class="of-comment"  style="margin: 5px;" onclick="sendReaction(event)">like</button>
                            </div>

                            <div id="active-comment">
                                <button id="active-comment-of-comment-btn-${comment_id}" comment_id="${comment_id}" onclick="show_commented_of_comment(event)">show reply</button>
                            </div>
                            
                            <div id="commented-of-comment-box-${comment_id}" style="display: none;"></div>
                            <div class="form-reply-comment" style="margin-left: 20px;">
                                <form action="/comments/create_comment/" method="post" id="send-comment-for-comment-${comment_id}" >
                                    <input type="text" name="content" id="content-comment-send">
                                    <input type="submit" id="submit" value="reply">
                                </form>
                            </div>
                        </div>`;

        var commented_box = document.getElementById(idElement);
        commented_box.innerHTML += comment;
    });

    data.comments.forEach(comment => {
        const comment_id = comment.id;
        const form = document.getElementById(`send-comment-for-comment-${comment_id}`);
        form.addEventListener('submit', function(event){
            event.preventDefault();
            console.log("submit");
            send_comment(event, -1, comment_id, "comment");
        });

        setCountReaction('comment', comment_id);

        isReacted('comment', comment_id);
    });
    }
}

function setCountReaction(forWhat, idWhat){
    formData = new FormData();
    what = (forWhat == 'posts') ? 'posts_id' : 'comment_id';
    otherWhat = (what == 'posts_id') ? 'comment_id' : 'posts_id';

    formData.append(what, idWhat);
    formData.append(otherWhat, -1);
    formData.append('csrfmiddlewaretoken', csrftoken);

    fetch(api_get_reactions, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        count = data.count;
        document.getElementById(`count-reaction-${forWhat}-${idWhat}`).textContent = count;
    })
}

function setStatusBtnReaction(target) {
    if (target.classList.contains('active-reaction-btn')) {
        target.classList.remove('active-reaction-btn');
    } else {
        target.classList.add('active-reaction-btn');
    }
}

function isReacted(forWhat, idWhat){
    formData = new FormData();
    what = (forWhat == 'posts') ? 'posts_id' : 'comment_id';
    otherWhat = (what == 'posts_id') ? 'comment_id' : 'posts_id';
    formData.append('csrfmiddlewaretoken', csrftoken);
    formData.append(what, idWhat);
    formData.append(otherWhat, -1);

    fetch(api_is_reacted, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data.is_reacted) {
            setStatusBtnReaction(document.getElementById(`react-btn-${forWhat}-${idWhat}`));
        }
    })
}

function sendReaction(event) {
    event.preventDefault();

    setStatusBtnReaction(event.target);

    console.log("sendReaction");

    ofWhat = (event.target.classList[0] == 'of-posts') ? 'posts_id' : 'comment_id';
    otherWhat = (ofWhat == 'posts_id') ? 'comment_id' : 'posts_id';
    idWhat = parseInt(event.target.getAttribute(ofWhat));
    what = (ofWhat == 'posts_id') ? 'posts' : 'comment';

    formData = new FormData();
    formData.append(ofWhat, idWhat);
    formData.append(otherWhat, -1);
    formData.append('type', 'like');
    formData.append('csrfmiddlewaretoken', csrftoken);

    if (event.target.classList.contains('active-reaction-btn')) {
        fetch(api_create_reaction, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setCountReaction(what, idWhat);
        })
    } else {
        fetch(api_delete_reaction, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setCountReaction(what, idWhat);
        })
    }
    
}


get_userprofile();
get_posts();

// console.log('csrf_token: ', csrftoken);