import React, { useRef } from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ( { route: { params } } ) => {
    console.log(params.id);
    const isCarousel = useRef();
    const images = [
        {
            id: "001",
            url: "https://image.goat.com/attachments/product_template_pictures/images/078/084/523/original/64795_00.png.png"
        },
        {
            id: "002",
            url: "https://upload.wikimedia.org/wikipedia/commons/7/72/Adidas_Yeezy_Boost_350_Pirate_Black.gif",
        },
    ];

    return (
        <View
            style = {{
                ...defaultStyle || {},
                padding: 0,
                backgroundColor: colors?.color1 || '#fff'
            }}
        >
            <Header back={ true } />
            
            <Carousel
                layout='stack'
                sliderWidth = {SLIDER_WIDTH}
                itemWidth = {ITEM_WIDTH}
                ref = {isCarousel}
                data = {images}
                renderItem = {CarouselCardItem}
            />
        </View>
    );
};

const CarouselCardItem = ({ item, index }) => (
    <View style={styles.container} key={index}>
        <Image source={{ uri: item.url }} style={styles.image} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: ITEM_WIDTH,
        resizeMode: "contain",
        height: 250,
    },
});

export default ProductDetails;
