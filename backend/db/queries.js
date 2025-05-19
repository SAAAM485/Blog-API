const prisma = require("./client");

async function getAllPosts() {
    try {
        const posts = await prisma.post.findMany();
        return posts;
    } catch (error) {
        console.error("Error fetching the posts:", error);
        throw new Error("Failed to fetch the posts");
    }
}

async function getPublishedPosts() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
        });
        return posts;
    } catch (error) {
        console.error("Error fetching the posts:", error);
        throw new Error("Failed to fetch the posts");
    }
}

async function getUnpublishedPosts() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: false,
            },
        });
        return posts;
    } catch (error) {
        console.error("Error fetching the posts:", error);
        throw new Error("Failed to fetch the posts");
    }
}

async function getPostById(id) {
    try {
        const post = await prisma.post.findMany({
            where: {
                id,
                published: true,
            },
        });
        return post;
    } catch (error) {
        console.error("Error fetching the post:", error);
        throw new Error("Failed to fetch the post");
    }
}

async function postPost(title, content) {
    if (!post.title || !post.content) {
        throw new Error("Title and content are required");
    } else {
        try {
            await prisma.post.create({
                data: {
                    title,
                    content,
                    tags,
                    published: false,
                },
            });
        } catch (error) {
            console.error("Error creating the post:", error);
            throw new Error("Failed to create the post");
        }
    }
}

async function publishPost(id) {
    try {
        await prisma.post.update({
            where: {
                id,
            },
            data: {
                published: true,
            },
        });
    } catch (error) {
        console.error("Error publishing the post:", error);
        throw new Error("Failed to publish the post");
    }
}

async function unpublishPost(id) {
    try {
        await prisma.post.update({
            where: {
                id,
            },
            data: {
                published: false,
            },
        });
    } catch (error) {
        console.error("Error unpublishing the post:", error);
        throw new Error("Failed to unpublish the post");
    }
}

async function putPost(id, title, content) {
    if (!title || !content) {
        throw new Error("Title and content are required");
    } else {
        try {
            await prisma.post.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                    tags,
                },
            });
        } catch (error) {
            console.error("Error updating the post:", error);
            throw new Error("Failed to update the post");
        }
    }
}

async function deletePost(id) {
    try {
        await prisma.post.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error("Error deleting the post:", error);
        throw new Error("Failed to delete the post");
    }
}

async function getPublishedPostsByTag(tag) {
    return await prisma.post.findMany({
        where: {
            where: { published: true },
            tags: { has: tag },
        },
    });
}

async function getAllPublishedTags() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { tags: true },
    });

    const allTags = [...new Set(posts.flatMap((post) => post.tags))];
    return allTags;
}

async function getUnpublishedPostsByTag(tag) {
    return await prisma.post.findMany({
        where: {
            published: false,
            tags: { has: tag },
        },
    });
}

async function getAllUnpublishedTags() {
    const posts = await prisma.post.findMany({
        where: { published: false },
        select: { tags: true },
    });

    const allTags = [...new Set(posts.flatMap((post) => post.tags))];
    return allTags;
}

async function getAllPostsByTag(tag) {
    const publishedPosts = await getPublishedPostsByTag(tag);
    const unpublishedPosts = await getUnpublishedPostsByTag(tag);
    return [...publishedPosts, ...unpublishedPosts];
}

async function getAllTags() {
    const publishedTags = await getAllPublishedTags();
    const unpublishedTags = await getAllUnpublishedTags();
    return [...new Set([...publishedTags, ...unpublishedTags])];
}

async function getCommentsByPostId(postId) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },
        });
        return comments;
    } catch (error) {
        console.error("Error fetching the comments:", error);
        throw new Error("Failed to fetch the comments");
    }
}

async function postComment(postId, author, content) {
    if (!comment.content) {
        throw new Error("Content is required");
    } else {
        try {
            await prisma.comment.create({
                data: {
                    author,
                    content,
                    postId,
                },
            });
        } catch (error) {
            console.error("Error creating the comment:", error);
            throw new Error("Failed to create the comment");
        }
    }
}

async function verifyAdminUser(username, password) {
    try {
        const adminUser = await prisma.adminUser.findUnique({
            where: {
                username,
            },
        });
        if (
            !adminUser ||
            !(await bcrypt.compare(adminUser.password, password))
        ) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error fetching the admin user:", error);
        throw new Error("Failed to fetch the admin user");
    }
}

/**
 * 建立圖片。若 blogId 有值，則建立關聯（根據你的模型設定，可自行調整）。
 * @param {string} url - 圖片 URL
 * @param {number} order - 圖片排序（預設為 0）
 * @param {string} [blogId] - 文章 ID，如果圖片與文章關聯
 * @returns {Promise<object>} - 新建立的 image 資料
 */
async function createImage(url) {
    return await prisma.image.create({
        data: { url },
    });
}

const getAllImages = async () => {
    return await prisma.image.findMany({
        orderBy: { createdAt: "asc" },
    });
};

const deleteImageById = async (id) => {
    return await prisma.image.delete({
        where: { id },
    });
};

module.exports = {
    getAllPosts,
    getPublishedPosts,
    getUnpublishedPosts,
    getPostById,
    postPost,
    publishPost,
    unpublishPost,
    putPost,
    deletePost,
    getPublishedPostByTag: getPublishedPostsByTag,
    getAllPublishedTags,
    getUnpublishedPostsByTag,
    getAllUnpublishedTags,
    getAllPostsByTag,
    getAllTags,
    getCommentsByPostId,
    postComment,
    verifyAdminUser,
    createImage,
    getAllImages,
    deleteImageById,
};
