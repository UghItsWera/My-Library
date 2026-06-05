import { supabase } from "./supabase";

/**
 * Adds a test book to verify Supabase connection
 */
export async function addTestBook() {
  const { data, error } = await supabase
    .from("books")
    .insert([
      {
        title: "Test Book",
        author: "System Check",
        genre: "Test",
        status: "unread",
        rating: 0,
      },
    ])
    .select();

  if (error) {
    console.error("Insert error:", error.message);
    return null;
  }

  return data;
}

/**
 * Fetch all books for debugging
 */
export async function getBooks() {
  const { data, error } = await supabase
    .from("books")
    .select("*");

  if (error) {
    console.error("Fetch error:", error.message);
    return [];
  }

  return data;
}