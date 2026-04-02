// src/services/supabase.ts

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://sznemvqqmvtxkqgjsmgr.supabase.co",   // ✅ YOUR PROJECT URL
  "sb_publishable_OSE6QxZeJGWOTPewRVpUfQ_3V2PEWGF" // ✅ YOUR KEY
);

// ✅ SAVE ARTICLE FUNCTION
export const saveArticle = async (article: any) => {
  try {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      console.log("User not logged in");
      return;
    }

    const { error } = await supabase.from("saved_articles").insert([
      {
        user_id: userData.user.id,
        title: article.title,
        image_url: article.image_url,
        content: article.content,
      },
    ]);

    if (error) {
      console.log("Save error:", error.message);
    } else {
      console.log("Article saved successfully ✅");
    }
  } catch (err) {
    console.log("Unexpected error:", err);
  }
};