import React from 'react';
import { StyleSheet,View, Text } from 'react-native';

class BodyText extends React.Component{
  render() {
    return(   //view HTMLで言うdiv
      <View>
       <Text style={styles.text}>
          {this.props.children}
          </Text>
      </View>
    );
  }
}

//this.props.childrenは App.jsのHI！に対応している

const styles = StyleSheet.create({
  text: {
    color: '#DDD',
    backgroundColor: '#eee',
  },
});


export default BodyText;     //exportすることで、他のjsでBodyTextを使うことができる
