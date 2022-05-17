class UI {
  constructor() {
    this.container = document.querySelector(".postsContainer")
    this.posts_list = document.querySelector("#posts")
    this.post_title = document.querySelector("#title");
    this.post_body = document.querySelector("#body");
    this.post_submit = document.querySelector(".post-submit");
    this.alert = document.querySelector(".form-end")
    this.hiddenInput = document.querySelector("#id")

  }
  // show posts on page
  showPosts(posts) {
    let html = "";
    posts.forEach(element => {
      html += `
      <div class="card mb-3">
			<div class="card-body">
				<h4 class="card-title">
					${element.title}
				</h4>
				<p class="card-text">
					${element.body}
				</p>
        <a href="#" class="edit card-link" data-id="${element.id}"><i class="fa fa-pencil"></i></a>
        <a href="#" class="delete card-link" data-id="${element.id}"><i class="fa fa-remove"></i></a>
			</div>
		</div>
      `
    });
    this.posts_list.innerHTML = html
  }
  // clear inputs
  clearInputs() {
    this.post_title.value = ""
    this.post_body.value = ""
  }
  // show alert message 
  alertMsg(msg, elementClass) {
    this.clearAlertMsg()
    const div = document.createElement("div");
    div.className = elementClass;
    div.textContent = msg
    const posts = document.querySelector("#posts")
    const container = document.querySelector(".postsContainer")
    container.insertBefore(div, posts)
    setTimeout(this.clearAlertMsg, 3000)
  }
  clearAlertMsg() {
    const currentAlert = document.querySelector(".alert")
    if (currentAlert) {
      currentAlert.remove()
    }
  }
  // fill form 
  fillForm(data) {
    this.post_title.value = data.title
    this.post_body.value = data.body
    this.hiddenInput.value = data.id
    this.changeState("edit")
  }
  //change state 
  changeState(type) {
    if (type === "edit") {
      this.post_submit.textContent = "Update"
      this.post_submit.classList.replace("btn-primary", "btn-warning")
      const btn = document.createElement("button")
      btn.className = "post-cancel btn btn-dark btn-block mt-3"
      btn.appendChild(document.createTextNode("Cancel"))
      document.querySelector(".postsContainer .card").appendChild(btn)
    } else {
      this.post_submit.textContent = "Post It"
      this.post_submit.classList.replace("btn-warning", "btn-primary")
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove()
        this.clearInputs()
        this.clearHiddenInputId()
      }
    }
  }

  // clear Id from hidden input 
  clearHiddenInputId() {
    this.hiddenInput.value = ""
  }

  // cancel edit 
  cancelEdit() {
    this.changeState()
    this.alertMsg("You have canceled the edit", "alert alert-success")

  }
}


export const ui = new UI();