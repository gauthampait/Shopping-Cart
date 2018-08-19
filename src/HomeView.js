import React, { Component } from 'react';
import { 
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native';

import { 
    Dimensions,
} from 'react-native'

const screenWidth = Dimensions.get('window').width

import {
    apiUrl,
    imageBaseUrl
} from './RMServices'
import {
    themeColor
} from './RMConstants'

import ProductDetailView from './ProductDetailView'

import styled from 'styled-components';

export default class HomeView extends Component {

    // Initial State of the Component
    state = {
        catalog : {
            products : [],
            page : 0,
        },
        networkStatus : false,
        showProduct : false,
        selectedProductID : null
    }

    // Customize ther Navigation bar of the StackNavigator
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

    constructor(props) {
        super(props);
    }

    componentWillMount(){

        // Initial call to fetch the products from the API.
        this.fetchCatalog(this.state.catalog.page,true)
    }

    renderItem = ({ item, index }) => {

        // Function to Render the cells of the FlatList.
        var imageUrl = imageBaseUrl + item.img.name
        return (
            <TouchableOpacity onPress={ () =>
                this.setState({ showProduct : true , selectedProductID : item.id})
            }>
                <View style={styles.card}>
                    <ProductImage                     
                        source={{uri: imageUrl, cache : 'force-cache'}}
                    />
                    <ProductName>{item.title}</ProductName>
                    <ProductPrice>{"$"+item.pricing.price}</ProductPrice>
                </View>
            </TouchableOpacity>
        )
    }

    render () {

        return (

            <Container>

                {/* Using a modal presentation instead of Push and passing the 
                product ID to fetch in the detailView */}
                <Modal
                    animationType='slide'
                    visible={this.state.showProduct}
                    onRequestClose={ 
                        () => {}
                    }>
                        <ProductDetailView 
                            onClose={
                                () => this.setState({showProduct : false })
                            }
                            productID={this.state.selectedProductID}/>
                </Modal>

                <FlatList
                    numColumns={2}
                    data={this.state.catalog.products}
                    renderItem={this.renderItem}
                    onEndReached={
                        () => this.fetchCatalog(this.state.catalog.page + 1, true)                    
                    }
                    refreshing={this.state.networkStatus}
                    onRefresh={
                        () => this.fetchCatalog(0, false)                    
                    }
                    keyExtractor={(item, index) => index}
                />
            </Container>
        );
    }
    
    async fetchCatalog(page,reset){

        // Fetch products from the api. And add it to the state so the new list is rendered.
        // Pagination uses a appending logic when the scoll is gone to the last.

        console.log("Page : ",page)

        this.setState({ networkStatus : true })
        const url = apiUrl + page
        const response = await fetch(url)
        var json = await response.json()



        if (reset == true) {
            
            var existingProducts = this.state.catalog.products
            var totalProducts = [...existingProducts,...json.products]
            json.products = totalProducts
        }
        console.log("After Page : ",json.page);
        this.setState({catalog : json, networkStatus : false })
    }
}


// Using styled-compoents for certain UI objects. Styled-Components make is much easier to
// styling properties. From the business logic.
const Container = styled.View`
    flex : 1;
    background-color : #eff2f7;
`

const ProductPrice = styled.Text`
    font-size : 14;
    margin-bottom : 5px;
`

const ProductImage = styled.Image`
    flex : 1;
    height : 50%;
    width : 90%;
    margin : 10px;
    margin-bottom : 10px;
    resize-mode : contain;
`

const ProductName = styled.Text`
    margin-left : 10px;
    margin-right : 10px;
    margin-bottom : 5px;
    height : 20%;
    font-size : 10;
`

// Using stylesheet for certain components.
const styles = StyleSheet.create({
    card : {
        flex : 1,
        height : screenWidth * 0.5,
        width : screenWidth / 2,
        backgroundColor : 'white',
        borderColor : '#eff2f7',
        borderWidth : 2,
        borderRadius : 10,
        justifyContent : 'flex-end',
        alignItems : 'center'
    }
});
