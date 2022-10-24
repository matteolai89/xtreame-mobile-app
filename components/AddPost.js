import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AddPost = ({ onAddPost }) => {
  const [writtenPost, setWrittenPost] = useState("");
  const onSubmitHandler = (writtenPost) => {
    onAddPost(writtenPost);
    setWrittenPost("");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
    >
      <TextInput
        style={styles.input}
        placeholder={"Write a Post"}
        multiline={true}
        value={writtenPost}
        onChangeText={(writtenPost) => {
          setWrittenPost(writtenPost);
        }}
      />

      <TouchableOpacity onPress={() => onSubmitHandler(writtenPost)}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "#ABAEC4",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ABAEC4",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    color: "#ABAEC4",
  },
});

export default AddPost;
