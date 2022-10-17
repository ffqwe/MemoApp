import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';



class MemoListScreen extends React.Component{
  state = {
    memoList: [],
  }

  componentDidMount(){
      const { currentUser } = firebase.auth();
      const db = firebase.firestore();
      db.collection(`users/${currentUser.uid}/memos`)   //ユーザごとのDBを取りに行く
        .onSnapshot((snapshot) => {　　　　　　　　　　　　//onSnapshotでリアルタイムでDBを更新する
          const memoList = [];
          snapshot.forEach((doc) => {
            memoList.push({ ...doc.data(), key: doc.id }); //...doc.date()にはbodyとcreatedOnが入っている。それとKeyを渡すことが可
          });
          this.setState({ memoList: memoList }); //左辺のmemoListはstateで定義したもの、右辺は.thenで定義したもの setStateで渡されたものを保存する
        });
  }

  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render(){
    return(
      <View style={styles.container}>
        <MemoList memoList={this.state.memoList} navigation={this.props.navigation} />
        <CircleButton
         name="plus"
         onPress={this.handlePress.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    backgroundColor: '#FFFDF6'
  }
});

export default MemoListScreen;
