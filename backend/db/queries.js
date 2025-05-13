const prisma = require("./client");

async function getBlogPosts() {
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

async function getPostByTag(tag) {
    return await prisma.post.findMany({
        where: { tags: { has: tag } },
    });
}

async function getAllTags() {
    const posts = await prisma.post.findMany({
        select: { tags: true },
    });

    const allTags = [...new Set(posts.flatMap((post) => post.tags))];
    return allTags;
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

module.exports = {
    getBlogPosts,
    getPostById,
    postPost,
    publishPost,
    unpublishPost,
    putPost,
    deletePost,
    getPostByTag,
    getAllTags,
    getCommentsByPostId,
    postComment,
    verifyAdminUser,
};
