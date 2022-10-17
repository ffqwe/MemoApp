import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';

class MemoEditScreen extends React.Component {
  state = {
    body: '',
    Key: '',      //コンポーネントでMemoDetailScreenで渡されてきた内容をstateで受け取る
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    this.setState({
      body: params.memo.body,
      key: params.memo.key,
    });  //MemoDetailScreenから読み込みの最初にsetStateでstateにメモ内容を渡す
  }

  handlePress() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth(); //currentUserはfirebaseから取得可　uidを抜き取る
    const newDate = firebase.firestore.Timestamp.now();
    const docRef = db.collection(`users/${currentUser.uid}/memos`).doc(this.state.key)　// メモのコレクションの参照　.docは単体のメモの参照が取れる
                     .update({
                       body: this.state.body,
                       createdOn: newDate,
                     })
                     .then(() => {
                       const { navigation } = this.props;
                       navigation.state.params.returnMemo({
                         body: this.state.body,
                         Key: this.state.Key,
                         createdOn: newDate,
                       });
                       this.props.navigation.goBack();                 //goBackメソッドで戻る
                     })
                     .catch(() => {
                     });
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput
        style={styles.memoEditInput}
        multiline
        value={this.state.body}
        onChangeText={(text) => { this.setState({ body: text }); }}
        underLineColorAndroid= "transparent"
        textAlignVertical="top" //Androidだけに有効
        />
        <CircleButton
        name="check"
        onPress={this.handlePress.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default MemoEditScreen;
