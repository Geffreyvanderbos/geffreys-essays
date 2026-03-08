function filterContent(content) {
  console.log("filterContent input:", content);
  // Remove @geffrey mentions from content (including Mastodon h-card format)
  let filtered = content
    .replace(
      /<span class="h-card"><a href="https:\/\/id\.geff\.re\/?@geffrey"[^>]*>@<span>geffrey<\/span><\/a><\/span>/gi,
      "",
    )
    .replace(
      /<span class="h-card"><a href="https:\/\/id\.geff\.re\/"[^>]*>@<span>geffrey<\/span><\/a><\/span>/gi,
      "",
    )
    .replace(/<span class="h-card">@geffrey(@geff\.re)?<\/span>/gi, "")
    .replace(/@geffrey(@geff\.re)?/gi, "");

  console.log("filterContent after regex:", filtered);

  // Clean up extra whitespace left behind after removing mentions
  // First remove whitespace between HTML tags, then normalize remaining whitespace
  filtered = filtered
    .replace(/>\s+</g, "><")
    .replace(/>\s+/g, ">")
    .replace(/\s+</g, "<")
    .replace(/\s+/g, " ")
    .trim();

  // Remove empty p tags left after filtering
  filtered = filtered.replace(/<p>\s*<\/p>/gi, "");

  console.log("filterContent output:", filtered);
  return filtered;
}

function renderComment(comment, target, parentId, isOriginal = false) {
  const node = document
    .querySelector("template#comment__template")
    .content.cloneNode(true);

  const author = node.querySelector(".author");
  author.innerHTML = `<a href="${comment.account.url}" title="Visit person on the Fediverse" class="no-ext-icon">${comment.account.display_name}</a>`;

  const commentContainer = node.querySelector(".comment");
  if (comment.in_reply_to_id !== parentId) {
    commentContainer.classList.add("indent");
  }

  if (isOriginal) {
    commentContainer.classList.add("original-post");
  }

  const publishDate = node.querySelector(".publish-date");
  const dateObj = new Date(comment.created_at);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  publishDate.textContent = `${year}/${month}/${day} ${hours}:${minutes}`;

  const userComment = node.querySelector(".content");
  userComment.innerHTML = filterContent(comment.content);

  const avatar = node.querySelector(".comment__profile-picture");
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
    renderComment(originalData, commentsNode, null, true);

    if (comments?.length > 0) {
      comments.forEach((comment) =>
        renderComment(comment, commentsNode, postId, false),
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
