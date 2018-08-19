// ImageScroller component with Page Control and horizontal FlatList.

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';

import {
    imageBaseUrl
} from './RMServices'

import {
    themeColor
} from './RMConstants'

import PageControl from 'react-native-page-control';    

export default class ImageScroller extends Component {

    // Initial state
    state = {
        currentPage : 0
    }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[{ 
            height : this.props.style.height + 20,
            width : this.props.style.width
        }, styles.container]}>

        {/* Implementing horizontal FlatList with the list of images from the props */}
        <FlatList
            horizontal
            pagingEnabled
            style={styles.list}
            data={this.props.images}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            legacyImplementation={false}
            onMomentumScrollEnd={this.onScrollEnd}
        />

        <PageControl
            style={styles.pageControl}
            numberOfPages={this.props.images.length}
            currentPage={this.state.currentPage}
            hidesForSinglePage
            pageIndicatorTintColor='gray'
            currentPageIndicatorTintColor={themeColor}
            indicatorStyle={{borderRadius: 5}}
            currentIndicatorStyle={{borderRadius: 5}}
            indicatorSize={{width:8, height:8}}
            onPageIndicatorPress={this.onItemTap}
        />

      </View>
    );
  }

  renderItem = ({item,index}) => {

    // Rendering each image item for the horizontal scroll view.
    return(
        <Image
            style={[styles.cell, { 
                    height : this.props.style.height,
                    width : this.props.style.width
                }   
            ]}
            source={{uri: imageBaseUrl+item.name}}
        />
    )
  }

  onScrollEnd = (e) => {

    // Resign the screen when scrolled to a loewer offset.

    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ currentPage : pageNum})
  }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
    },
    list : {
        backgroundColor : 'white'
    },
    cell : {
        backgroundColor : 'white',
        resizeMode : 'contain'
    },
    pageControl : {
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
    },
})
