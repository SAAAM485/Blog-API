const API_BASE_URL = "http://localhost:3000/api";

// 取得所有文章
export async function getPosts() {
    const response = await fetch(`${API_BASE_URL}/posts`);
    return await response.json();
}

// 取得單篇文章
export async function getPostById(postId) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    return await response.json();
}

// 取得文章留言
export async function getCommentsByPostId(postId) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    return await response.json();
}

// 使用標籤搜尋文章
export async function getPostsByTag(tag) {
    const response = await fetch(`http://localhost:3000/tags/${tag}`);
    return await response.json();
}

// 取得所有標籤
export async function getAllTags() {
    const response = await fetch(`${API_BASE_URL}/tags`);
    return await response.json();
}

// 新增留言
export async function addComment(postId, author, content) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, author, content }), // ✅ 確保符合後端所需格式
    });
    return await response.json();
}
