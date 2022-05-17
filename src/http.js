
class EasyHttp {

  // get posts 
  async get(url) {
    const response = await fetch(url);
    const posts = await response.json()
    return posts

  }
  // post new post 
  async post(url, post) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    const resData = await response.json()
    return resData
  }

  // change post 
  async put(url, newPost) {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newPost)
    })
    const updated = await response
    return updated
  }

  // delet post 
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
    const data = await response.json()

    return data
  }

}
export const http = new EasyHttp();