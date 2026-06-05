import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, MaxContentWidth } from "@/constants/theme";

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  read: boolean;
};

const BOOKS: Book[] = [
  { id: "1", title: "The Cruel Prince", author: "Holly Black", genre: "Fantasy", read: true },
  { id: "2", title: "Six of Crows", author: "Leigh Bardugo", genre: "Fantasy", read: false },
  { id: "3", title: "Normal People", author: "Sally Rooney", genre: "Romance", read: true },
  { id: "4", title: "It Ends With Us", author: "Colleen Hoover", genre: "Romance", read: false },
  { id: "5", title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", read: false },
  { id: "6", title: "Verity", author: "Colleen Hoover", genre: "Thriller", read: true },
];

function groupByGenre(books: Book[]) {
  return books.reduce((acc: Record<string, Book[]>, book) => {
    if (!acc[book.genre]) acc[book.genre] = [];
    acc[book.genre].push(book);
    return acc;
  }, {});
}

function BookSpine({ book }: { book: Book }) {
  return (
    <Pressable
      style={[
        styles.spine,
        {
          backgroundColor: book.read ? Colors.primary : Colors.card,
          opacity: book.read ? 1 : 0.4,
        },
      ]}
    >
      <Text numberOfLines={2} style={styles.spineText}>
        {book.title}
      </Text>
    </Pressable>
  );
}

function Shelf({ genre, books }: { genre: string; books: Book[] }) {
  return (
    <View style={styles.shelfContainer}>
      <Text style={styles.genreTitle}>{genre}</Text>

      <View style={styles.shelf}>
        {books.map((book) => (
          <BookSpine key={book.id} book={book} />
        ))}
      </View>

      <View style={styles.shelfLine} />
    </View>
  );
}

export default function HomeScreen() {
  const grouped = groupByGenre(BOOKS);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>📚 My Bookshelf</Text>

        <FlatList
          data={Object.entries(grouped)}
          keyExtractor={([genre]) => genre}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => {
            const [genre, books] = item;
            return <Shelf genre={genre} books={books} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  wrapper: {
    flex: 1,
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: Spacing.four,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.accent,
    marginBottom: Spacing.four,
  },

  shelfContainer: {
    marginBottom: Spacing.five,
  },

  genreTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.accent,
    marginBottom: Spacing.two,
  },

  shelf: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    backgroundColor: Colors.background,
  },

  shelfLine: {
    height: 6,
    backgroundColor: Colors.accent,
    borderRadius: 4,
    marginTop: Spacing.one,
    opacity: 0.3,
  },

  spine: {
    width: 70,
    height: 110,
    borderRadius: 6,
    padding: 6,
    justifyContent: "flex-end",
  },

  spineText: {
    fontSize: 10,
    color: "#000",
    fontWeight: "600",
  },
});