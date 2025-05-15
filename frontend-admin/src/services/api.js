const API_BASE_URL = "http://localhost:3000/api";

// 取得所有文章
export async function getAllPosts() {
    const response = await fetch(`${API_BASE_URL}/admin/blogs`);
    return await response.json();
}

// 取得所有已發布文章
export async function getPublishedPosts() {
    const response = await fetch(`${API_BASE_URL}/client/blogs`);
    return await response.json();
}

// 取得所有未發布文章
export async function getUnpublishedPosts() {
    const response = await fetch(`${API_BASE_URL}/admin/blogs/unpublished`);
    return await response.json();
}

// 取得單篇文章
export async function getPostById(postId) {
    const response = await fetch(`${API_BASE_URL}/client/blogs/${postId}`);
    return await response.json();
}

// 新增文章
export async function addPost(title, content, tags) {
    const response = await fetch(`${API_BASE_URL}/admin/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags }),
    });
    return await response.json();
}

// 發布文章
export async function publishPost(postId) {
    const response = await fetch(
        `${API_BASE_URL}/admin/posts/${postId}/publish`,
        {
            method: "POST",
        }
    );
    return await response.json();
}

// 隱藏文章
export async function hidePost(postId) {
    const response = await fetch(`${API_BASE_URL}/admin/posts/${postId}/hide`, {
        method: "POST",
    });
    return await response.json();
}

// 修改文章
export async function updatePost(postId, title, content, tags) {
    const response = await fetch(`${API_BASE_URL}/admin/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(title, content, tags),
    });
    return await response.json();
}

// 刪除文章
export async function deletePost(postId) {
    const response = await fetch(`${API_BASE_URL}/admin/posts/${postId}`, {
        method: "DELETE",
    });
    return await response.json();
}

// 使用標籤搜尋已發布文章
export async function getPublishedPostsByTag(tag) {
    const response = await fetch(`${API_BASE_URL}/client/tags/${tag}`);
    return await response.json();
}

// 取得所有已發布標籤
export async function getAllPublishedTags() {
    const response = await fetch(`${API_BASE_URL}/client/tags`);
    return await response.json();
}

// 使用標籤搜尋未發布文章
export async function getUnpublishedPostsByTag(tag) {
    const response = await fetch(
        `${API_BASE_URL}/admin/tags/unpublished/${tag}`
    );
    return await response.json();
}

// 取得所有未發布標籤
export async function getAllUnpublishedTags() {
    const response = await fetch(`${API_BASE_URL}/admin/tags/unpublished`);
    return await response.json();
}

// 使用標籤搜尋所有文章
export async function getPostsByTag(tag) {
    const response = await fetch(`${API_BASE_URL}/admin/tags/${tag}`);
    return await response.json();
}

// 取得所有標籤
export async function getAllTags() {
    const response = await fetch(`${API_BASE_URL}/admin/tags`);
    return await response.json();
}

// 取得文章留言
export async function getCommentsByPostId(postId) {
    const response = await fetch(
        `${API_BASE_URL}/client/blogs/${postId}/comments`
    );
    return await response.json();
}

// 新增留言
export async function addComment(postId, author, content) {
    const response = await fetch(
        `${API_BASE_URL}/client/posts/${postId}/comments`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author, content }), // 確保符合後端所需格式
        }
    );
    return await response.json();
}

// 取得 JWT（登入）
export async function apiLogin(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    localStorage.setItem("jwt", data.token); // ✅ 存儲 JWT
    return data;
}

// 登出
export async function apiLogout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.success) {
        localStorage.removeItem("jwt"); // ✅ 確保 API 回應成功後再刪除 Token
    }
    return data;
}

// 通用 API 請求（附加 JWT）
export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem("jwt");
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`, // ✅ 附加 JWT
    };
    return fetch(url, { ...options, headers });
}
