import { View, Text, Button } from "react-native";
import { addTestBook, getBooks } from "../services/books";
import { useState } from "react";

export default function BookshelfScreen() {
  const [books, setBooks] = useState<any[]>([]);

  async function handleAdd() {
    await addTestBook();
    const updated = await getBooks();
    setBooks(updated);
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Bookshelf</Text>

      <Button title="Add Test Book" onPress={handleAdd} />

      {books.map((b) => (
        <Text key={b.id}>
          {b.title} - {b.author}
        </Text>
      ))}
    </View>
  );
}