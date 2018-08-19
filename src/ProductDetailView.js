import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import styled from 'styled-components'
import ImageScroller from './ImageScroller'

const screenWidth = Dimensions.get('window').width
import {
    themeColor
} from './RMConstants'

import {
    productDetailUrl
} from './RMServices'

export default class ProductDetailView extends Component {

    state = {
        networkStatus : true,
    }

    static navigationOptions = {
        title : 'Explore',
        headerTitleStyle : {
            color : 'white',
            fontSize : 20
        },
        headerStyle : { 
            backgroundColor : themeColor
        }
    }
    
  render() {

    var productID =  this.props.productID
    if (this.state.product == undefined) {
        this.fetchProdcutWithId(productID)
        return(
            <View style={{
                flex : 1,
                justifyContent : 'center',
                alignSelf : 'center'
            }}>
                <ActivityIndicator 
                    size="large"
                    color={themeColor}
                    style={{alignSelf : 'center'}}
                />
            </View>            
        )
    }

    const {
        desc,
        title,
        measure,
        images
    } = this.state.product

    return (

      <Container 
            scrollEventThrottle={16}
            onScroll={this.handleScroll}
        >
        <NavigationView>
            <TouchableOpacity 
                style={{height : 25, justifyContent : 'center' }}
                onPress={
                () => this.props.onClose()
            }>
                <Image 
                    style={{ height : '50%', width : 50, resizeMode : 'contain'}}
                    source={require('./res/img/DownArrow.png')}/>
            </TouchableOpacity>
            <TouchableOpacity><SubTitle>SHARE</SubTitle></TouchableOpacity>
        </NavigationView>
        <ImageScroller 
            images={images}
            style={{
                height : screenWidth * 0.6,
                width : screenWidth - 20,
                marginLeft : 10,
                marginRight : 10
            }}
        />
        <Title style={{fontSize : screenWidth * 0.05, marginTop : 20}}> 
            {title} 
        </Title>
        <SubTitle>{measure.wt_or_vol}</SubTitle>
        <Separator/>
        <SubTitle>About the Product</SubTitle>
        <Description>{desc}</Description>
        <AddToCardButton>
            <Text style={styles.whiteText}>ADD TO CART</Text>
        </AddToCardButton>
      </Container>
    );
    }

    async fetchProdcutWithId(productID){

      var url = productDetailUrl+productID

      const response = await fetch(url)
      var json = await response.json() 

      this.setState({product : json.product, networkStatus : false })
    }

    handleScroll = ({nativeEvent}) => {
        if (nativeEvent.contentOffset.y < -120){
            this.props.onClose()
        }
    }
}

const Container = styled.ScrollView`
    flex : 1;
    background-color : white;
`

const NavigationView = styled.View`
    justify-content : space-between;
    padding-left : 10px;
    padding-right : 10px;
    align-items : flex-end;
    height : 10%;
    flex-direction : row;
`

const Title = styled.Text`
    margin : 10px;
`

const SubTitle = styled.Text`
    color : gray;
    margin : 5px;
    margin-left : 10px;
    margin-right : 10px;
`

const Description = styled.Text`
    margin : 5px;
    margin-left : 10px;
    margin-right : 10px;
`

const AddToCardButton = styled.TouchableOpacity`
    margin : 10px;
    justify-content : center;
    align-items : center;
    background : #EA374A;
    height : 8%;
`

const Separator = styled.View`
    background : lightgray;
    height : 0.5px;
    margin : 5px;
    margin-left : 10px;
    margin-right : 10px;
`

const styles = StyleSheet.create({
    whiteText : {
        color : 'white',
    }
})