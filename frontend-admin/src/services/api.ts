import type { Post, Comment, Image } from "../types/Models";
const API_BASE_URL = "http://localhost:3000/api";

// 取得所有文章
export async function getAllPosts(): Promise<Post[]> {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/admin/blogs`);
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.status}`);
        }
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getAllPosts:", error.message);
        } else {
            console.error("Unknown error in getAllPosts");
        }
        return [];
    }
}

// 取得所有已發布文章
export async function getPublishedPosts(): Promise<Post[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/client/blogs`);
        if (!response.ok) {
            throw new Error(
                `Error fetching published posts: ${response.status}`
            );
        }
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getPublishedPosts:", error.message);
        } else {
            console.error("Unknown error in getPublishedPosts");
        }
        return [];
    }
}

// 取得所有未發布文章
export async function getUnpublishedPosts(): Promise<Post[]> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/blogs/unpublished`
        );
        if (!response.ok) {
            throw new Error(
                `Error fetching unpublished posts: ${response.status}`
            );
        }
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getUnpublishedPosts:", error.message);
        } else {
            console.error("Unknown error in getUnpublishedPosts");
        }
        return [];
    }
}

// 取得單篇文章
export async function getAllPostById(postId: string): Promise<Post | null> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/blogs/${postId}`
        );
        if (!response.ok) {
            throw new Error(
                `Error fetching all post ${postId}: ${response.status}`
            );
        }
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                `Error in getAllPostById (${postId}):`,
                error.message
            );
        } else {
            console.error(`Unknown error in getAllPostById (${postId})`);
        }
        return null;
    }
}

// 新增文章
export async function addPost(
    title: string,
    content: string,
    tags: string[]
): Promise<void> {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/admin/blogs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, tags }),
        });
        if (!response.ok) {
            throw new Error(`Error adding post: ${response.status}`);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in addPost:`, error.message);
        } else {
            console.error(`Unknown error in addPost`);
        }
    }
}

// 發布文章
export async function publishPost(postId: string): Promise<void> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/blogs/${postId}/publish`,
            {
                method: "POST",
            }
        );
        if (!response.ok) {
            throw new Error(
                `Error publishing post ${postId}: ${response.status}`
            );
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in publishPost (${postId}):`, error.message);
        } else {
            console.error(`Unknown error in publishPost (${postId})`);
        }
    }
}

// 隱藏文章
export async function hidePost(postId: string): Promise<void> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/blogs/${postId}/unpublish`,
            {
                method: "POST",
            }
        );
        if (!response.ok) {
            throw new Error(`Error hiding post ${postId}: ${response.status}`);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in hidePost (${postId}):`, error.message);
        } else {
            console.error(`Unknown error in hidePost (${postId})`);
        }
        return null;
    }
}

// 修改文章
export async function updatePost(
    postId: string,
    title: string,
    content: string,
    tags: string[]
): Promise<void> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/blogs/${postId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, tags }),
            }
        );
        if (!response.ok) {
            throw new Error(
                `Error updating post ${postId}: ${response.status}`
            );
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in updatePost (${postId}):`, error.message);
        } else {
            console.error(`Unknown error in updatePost (${postId})`);
        }
    }
}

// 刪除文章
export async function deletePost(postId: string): Promise<void> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/blogs/${postId}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error(
                `Error deleting post ${postId}: ${response.status}`
            );
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in deletePost (${postId}):`, error.message);
        } else {
            console.error(`Unknown error in deletePost (${postId})`);
        }
        return null;
    }
}

// 使用標籤搜尋已發布文章
export async function getPublishedPostsByTag(tag: string): Promise<Post[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/client/tags/${tag}`);
        if (!response.ok) {
            throw new Error(
                `Error fetching published posts with tag ${tag}: ${response.status}`
            );
        }
        return (await response.json()) as Post[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                `Error in getPublishedPostsByTag (${tag}):`,
                error.message
            );
        } else {
            console.error(`Unknown error in getPublishedPostsByTag (${tag})`);
        }
        return [];
    }
}

// 取得所有已發布標籤
export async function getAllPublishedTags(): Promise<string[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/client/tags`);
        if (!response.ok) {
            throw new Error(
                `Error fetching published tags: ${response.status}`
            );
        }
        return (await response.json()) as string[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getAllPublishedTags:", error.message);
        } else {
            console.error("Unknown error in getAllPublishedTags");
        }
        return [];
    }
}

// 使用標籤搜尋未發布文章
export async function getUnpublishedPostsByTag(tag: string): Promise<Post[]> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/tags/unpublished/${tag}`
        );
        if (!response.ok) {
            throw new Error(
                `Error fetching unpublished posts with tag ${tag}: ${response.status}`
            );
        }
        return (await response.json()) as Post[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                `Error in getUnpublishedPostsByTag (${tag}):`,
                error.message
            );
        } else {
            console.error(`Unknown error in getUnpublishedPostsByTag (${tag})`);
        }
        return [];
    }
}

// 取得所有未發布標籤
export async function getAllUnpublishedTags(): Promise<string[]> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/tags/unpublished`
        );
        if (!response.ok) {
            throw new Error(
                `Error fetching unpublished tags: ${response.status}`
            );
        }
        return (await response.json()) as string[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getAllUnpublishedTags:", error.message);
        } else {
            console.error("Unknown error in getAllUnpublishedTags");
        }
        return [];
    }
}

// 使用標籤搜尋所有文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/tags/${tag}`
        );
        if (!response.ok) {
            throw new Error(
                `Error fetching posts with tag ${tag}: ${response.status}`
            );
        }
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in getPostsByTag (${tag}):`, error.message);
        } else {
            console.error(`Unknown error in getPostsByTag (${tag})`);
        }
        return [];
    }
}

// 取得所有標籤
export async function getAllTags(): Promise<string[]> {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/admin/tags`);
        if (!response.ok) {
            throw new Error(`Error fetching all tags: ${response.status}`);
        }
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getAllTags:", error.message);
        } else {
            console.error("Unknown error in getAllTags");
        }
        return [];
    }
}

// 取得文章留言
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/blogs/${postId}/comments`
        );
        if (!response.ok) {
            throw new Error(
                `Error fetching comments for post ${postId}: ${response.status}`
            );
        }
        return (await response.json()) as Comment[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                `Error in getCommentsByPostId (${postId}):`,
                error.message
            );
        } else {
            console.error(`Unknown error in getCommentsByPostId (${postId})`);
        }
        return [];
    }
}

// 新增留言
export async function addComment(
    postId: string,
    author: string,
    content: string
): Promise<void> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/blogs/${postId}/comments`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author, content }),
            }
        );
        if (!response.ok) {
            throw new Error(
                `Error adding comment for post ${postId}: ${response.status}`
            );
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error in addComment (${postId}):`, error.message);
        } else {
            console.error(`Unknown error in addComment (${postId})`);
        }
    }
}

interface AuthResponse {
    token?: string;
    success?: boolean;
}

// 取得 JWT（登入）
export async function apiLogin(
    username: string,
    password: string
): Promise<AuthResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`);
        }
        const data: AuthResponse = await response.json();
        if (!data.token) {
            throw new Error("Login failed: No token received");
        }
        localStorage.setItem("jwt", data.token);
        return data;
    } catch (error: unknown) {
        console.error("Error in apiLogin:", error);
        throw new Error("Login failed");
    }
}

// 登出
export async function apiLogout(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error(`Logout failed: ${response.status}`);
        } else {
            localStorage.removeItem("jwt");
        }
    } catch (error: unknown) {
        console.error("Error in apiLogout:", error);
        throw new Error("Logout failed");
    }
}

// 通用 API 請求（附加 JWT）
export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = localStorage.getItem("jwt");
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };
    return fetch(url, { ...options, headers });
}

// 獲取圖片
export async function fetchImages(): Promise<Image[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/client/images`);
        if (!response.ok) {
            throw new Error(`Error fetching images: ${response.status}`);
        }
        return (await response.json()) as Image[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in fetchImages:", error.message);
        } else {
            console.error("Unknown error in fetchImages");
        }
        throw new Error("Failed to fetch images");
    }
}

// 上傳圖片
interface UploadResponse {
    success: boolean;
    imageUrls: string[];
}

export async function uploadImages(files: File[]): Promise<UploadResponse> {
    const formData = new FormData();
    for (const file of files) {
        formData.append("images", file);
    }

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/admin/images`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to upload images: ${errorMessage}`);
        }
        return (await response.json()) as UploadResponse;
    } catch (error: unknown) {
        console.error("Error uploading images:", error);
        throw new Error("Upload failed");
    }
}

// 刪除圖片
export async function deleteImage(imageId: string): Promise<void> {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}/admin/images/${imageId}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete image: ${errorMessage}`);
        }
    } catch (error: unknown) {
        console.error("Error deleting image:", error);
        throw new Error("Failed to delete image");
    }
}
