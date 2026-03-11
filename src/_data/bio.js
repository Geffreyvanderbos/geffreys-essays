import 'dotenv/config';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const site = require("./site.json");

const fallback = {
  html: "<p>Designer helping people navigate financial stress at Stichting NSR. Privacy-conscious, plain-text advocate and allergic to vendor lock-in. Husband to Illustrator Julia; guardian of Loki the Shiba Inu. Obsessed with extreme music and music science.</p>",
  displayName: "Geffrey van der Bos",
  avatar: "/assets/cv-img/profile.jpg",
  avatarDescription: "Headshot of a man with light skin, high forehead, and eyes with friendly laughter lines. He has short hair and a short bronze beard with a large mustache. He is wearing a black crew-neck sweater against a dark gray background."
};

export default async function () {
  const token = process.env.GOTOSOCIAL_TOKEN;

  if (!token) {
    console.warn("⚠️ No token found, using fallback bio");
    return fallback;
  }

  try {
    const res = await fetch(
      `${site.fediverse.instance}/api/v1/accounts/lookup?acct=geffrey`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    // console.log(data);
    return {
      html: data.note,
      displayName: data.display_name,
      avatar: data.avatar,
      avatarDescription: data.avatar_description,
      url: data.url
    };

  } catch (e) {
    console.warn("⚠️ Failed to fetch bio:", e.message);
    return fallback;
  }
}
