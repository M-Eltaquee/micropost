import { http } from "./http.js"
import { ui } from "./ui.js"

// Show posts 
document.addEventListener("DOMContentLoaded", getPosts)
function getPosts() {
  http.get("http://localhost:3000/posts").
    then(posts => ui.showPosts(posts)).
    catch(err => console.log(err))
}

// supmit post
ui.post_submit.addEventListener("click", submitPost)
function submitPost() {
  const title = ui.post_title.value
  const body = ui.post_body.value
  const id = document.querySelector("#id").value
  const data = { title, body }
  if (title === "" || body === "") {
    ui.alertMsg("Please fill in all fields !", "alert alert-danger")
  }
  else {
    if (id === "") {
      http.post("http://localhost:3000/posts", data).
        then(data => getPosts()).
        catch(err => console.log(err))
      ui.clearInputs()
      ui.alertMsg("Post has been successfuly added.", ' alert alert-success')
    } else {
      http.put(`http://localhost:3000/posts/${id}`, data).
        then(updated => {
          getPosts()
          ui.changeState()
          ui.alertMsg("Post has been successfuly updated. ", "alert alert-success")
        }).
        catch(err => console.log(err))
    }
  }
}

// delete post 
document.querySelector("#posts").addEventListener("click", deletePost)
function deletePost(e) {

  if (e.target.classList.contains("fa-remove")) {
    const elementId = e.target.parentElement.dataset.id
    if (confirm("Are you sure ?!")) {
      http.delete(`http://localhost:3000/posts/${elementId}`).
        then(data => {
          getPosts()
          ui.alertMsg("Post has been deleted successfuly", "alert alert-danger")

        }).
        catch(err => console.log(err))
    }
  }
  e.preventDefault(e)
}

// edit state listner 
document.querySelector("#posts").addEventListener("click", editState)
function editState(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const elementId = e.target.parentElement.dataset.id
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.innerText
    const body = e.target.parentElement.previousElementSibling.innerText
    const data = {
      id: elementId,
      title: title,
      body: body
    }
    ui.fillForm(data)
  }
  e.preventDefault()
}

// cancel edit listner 
document.querySelector(".postsContainer .card").addEventListener("click", cancelEdit)
function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.cancelEdit()
  }
  e.preventDefault()
}