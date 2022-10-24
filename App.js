import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AddPost from "./components/AddPost";
import Post from "./components/Post";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchDataPost();
  }, []);

  const fetchDataPost = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  };

  const onAddPost = async (body) => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        body: body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts((posts) => [data, ...posts]);
      });
  };

  const onEdit = async (id, body) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
      method: "PUT",
      body: JSON.stringify({
        body: body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedPosts = posts.map((post) => {
          console.log(post);
          if (post.id === id) {
            post.body = body;
          }
          return post;
        });
        setPosts((posts) => updatedPosts);
      });
  };

  const onDeletePost = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Xtream Posts Project</Text>
      <ScrollView style={styles.postsWrapper}>
        <View style={styles.items}>
          {posts.map((post) => (
            <Post
              id={post.id}
              key={post.id}
              body={post.body}
              onDeletePost={onDeletePost}
              onEdit={onEdit}
            />
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
      <AddPost onAddPost={onAddPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postsWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    maxHeight: 560,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 80,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  items: {},
});
