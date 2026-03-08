// Blog comments script for fediverse

function renderComment(comment, target, parentId) {
  const node = document
    .querySelector("template#comment-template")
    .content.cloneNode(true);

  const author = node.querySelector(".author");
  author.textContent = `${comment.account.display_name} (@${comment.account.acct})`;

  const commentContainer = node.querySelector(".blog-comment");
  if (comment.in_reply_to_id !== parentId) {
    commentContainer.classList.add("indent");
  }

  const publishDate = node.querySelector(".publish-date");
  const dateObj = new Date(comment.created_at);
  publishDate.textContent = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;

  const userComment = node.querySelector(".comment");
  userComment.innerHTML = comment.content;

  const avatar = node.querySelector("img");
  avatar.src = comment.account.avatar_static;

  target.appendChild(node);
}

async function renderComments() {
  const commentsNode = document.querySelector("#comments");
  const postId = commentsNode?.dataset?.id;
  if (!postId) return;

  commentsNode.innerHTML = '<p class="loading">Loading comments...</p>';

  const baseUrl = "https://id.geff.re";
  const token = "NDEWOTJJNWITZWFLMC0ZMJJILWJHYTATNWI4MJG5ZTEYNTQ4";

  try {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const [originalPost, context] = await Promise.all([
      fetch(`${baseUrl}/api/v1/statuses/${postId}`, { headers }),
      fetch(`${baseUrl}/api/v1/statuses/${postId}/context`, { headers }),
    ]);

    if (!originalPost.ok || !context.ok) {
      throw new Error("Failed to fetch comments");
    }

    const originalData = await originalPost.json();
    const contextData = await context.json();
    const comments = contextData.descendants;

    commentsNode.innerHTML = "";
    renderComment(originalData, commentsNode, null);

    if (comments?.length > 0) {
      comments.forEach((comment) =>
        renderComment(comment, commentsNode, postId),
      );
    } else {
      commentsNode.innerHTML +=
        "<p>No comments yet. Be the first to comment!</p>";
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    commentsNode.innerHTML =
      "<p>Failed to load comments. Please try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#comments")) renderComments();
});
