import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Post = ({ body, id, onEdit, onDeletePost }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isWrittenEdit, setIsWrittenEdit] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const onShowComments = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments((comments) => [...data]);
      });
    console.log(comments);
  };

  const commentsHandler = () => {
    setShowComments(!showComments);
    onShowComments(id);
  };

  const editHandler = () => {
    setIsWrittenEdit(body);
    setIsEdit(!isEdit);
  };

  const saveEditHandler = () => {
    onEdit(id, isWrittenEdit);
    setIsEdit(!isEdit);
  };

  const deleteHandler = () => {
    setIsDeleted(!isDeleted);
    onDeletePost(id);
  };
  return (
    <View style={styles.itemList}>
      {isEdit ? (
        <View
          style={[
            styles.item,
            { opacity: !isDeleted ? 1 : 0.6 },
            { backgroundColor: !isEdit ? "#C7CEE6" : "#F1F3F9" },
            { borderWidth: !isEdit ? "none" : 1 },
            { borderColor: !isEdit ? "none" : "#C7CEE6" },
          ]}
        >
          <TextInput
            editable={true}
            value={isWrittenEdit}
            onChangeText={(isWrittenEdit) => {
              setIsWrittenEdit(isWrittenEdit);
            }}
            multiline={true}
          />
        </View>
      ) : (
        <View style={[styles.item, { opacity: !isDeleted ? 1 : 0.3 }]}>
          <Text style={styles.text}>{body}</Text>
        </View>
      )}
      <View style={styles.editDeleteWrapper}>
        <TouchableOpacity style={styles.commentsText} onPress={commentsHandler}>
          <Text>Comments</Text>
        </TouchableOpacity>
        {isEdit ? (
          <TouchableOpacity style={styles.editText} onPress={saveEditHandler}>
            <Text>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editText} onPress={editHandler}>
            <Text>Edit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deleteText} onPress={deleteHandler}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
      {showComments && (
        <View style={styles.commentsContainer}>
          {comments.map((comment) => (
            <View style={styles.comments}>
              <Text>{comment.body}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemList: {
    borderBottomWidth: 5,
    borderBottomColor: "#F5F5F4",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  item: {
    backgroundColor: "#F8F4F1",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    maxWidth: "90%",
  },
  editDeleteWrapper: {
    marginTop: 15,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingBottom: 10,
  },

  editText: {
    backgroundColor: "#80808021",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  deleteText: {
    backgroundColor: "#ff8080b3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  commentsContainer: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  commentsText: {
    backgroundColor: "#fff87d88",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  comments: {
    backgroundColor: "#EADFD6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    maxWidth: 270,
    marginLeft: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default Post;
