const API_BASE_URL = "http://localhost:3000/api/client";

// 取得所有文章
export async function getPublishedPosts() {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    return await response.json();
}

// 取得單篇文章
export async function getPostById(postId) {
    const response = await fetch(`${API_BASE_URL}/blogs/${postId}`);
    return await response.json();
}

// 取得文章留言
export async function getCommentsByPostId(postId) {
    const response = await fetch(`${API_BASE_URL}/blogs/${postId}/comments`);
    return await response.json();
}

// 使用標籤搜尋文章
export async function getPublishedPostsByTag(tag) {
    const response = await fetch(`${API_BASE_URL}/tags/${tag}`);
    return await response.json();
}

// 取得所有標籤
export async function getAllPublishedTags() {
    const response = await fetch(`${API_BASE_URL}/tags`);
    return await response.json();
}

// 新增留言
export async function addComment(postId, author, content) {
    const response = await fetch(`${API_BASE_URL}/blogs/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, content }), // ✅ 確保符合後端所需格式
    });
    return await response.json();
}

// 獲取圖片
export async function fetchImages() {
    try {
        const response = await fetch(`${API_BASE_URL}/images`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
}
