import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Carousel from 'react-native-snap-carousel';
import { Avatar, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH;
export const iconOptions = {
    size: 20,
    style: {
        borderRadius: 5,
        backgroundColor: colors.color5,
        height: 25,
        width: 25,
    }
}

const ProductDetails = ( { route: { params } } ) => {
    console.log(params.id);
    const isCarousel = useRef();
    const [quantity, setQuantity] = useState(1);

    const name = "Yeezy";
    const price = "500"; 
    const description = "The YEEZY BOOST 350 V2 features an upper composed of re-engineered Primeknit. The post-dyed monofilament side stripe is woven into the upper. Reflective threads are woven into the laces. The midsole utilizes adidas’ innovative BOOST™ technology.";
    const stock = 5; // temporary stock amount

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

    const incrementQty = () => {
        if(stock <= quantity) return; // if stock is <= quantity, do nothing and return the same quantity
        setQuantity((prev) => prev + 1);
    };

    const decrementQty = () => {
        if(quantity <= 1) return; // if quantity is <= 1, do nothing and return the same quantity
        setQuantity((prev) => prev - 1);
    };

    const addToCartHandler = () => {
        if(stock == 0) 
            return Toast.show({
                type: "error",
                text1: "Out of Stock",
            });
        else 
            return Toast.show({
                type: "success",
                text1: "Added to Cart"
            });
    };

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

            <View style={{
                backgroundColor: colors.color2,
                padding: 35,
                flex: 1,
                marginTop: -380,
                borderTopLeftRadius: 55,
                borderTopRightRadius: 55,
            }}>
                <Text numberOfLines={2} style={{ fontSize: 25, }}>{name}</Text>
                <Text style={{ fontSize: 18, fontWeight: "900" }}>${price}</Text>
                <Text numberOfLines={8} style={{ letterSpacing: 1, lineHeight: 20, marginVertical: 15, }}>{description}</Text>
                
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    justifyContent: "space-between",
                }}>
                    <Text style={{
                        color: colors.color3,
                        fontWeight: "100",
                    }}>Quantity</Text>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginLeft: 20, // Add some spacing between "Quantity" text and buttons
                    }}>
                        <TouchableOpacity onPress={decrementQty}>
                            <Avatar.Icon 
                                icon={'minus'}
                                {...iconOptions} 
                            />
                        </TouchableOpacity>
                        <Text style={styles.quantityStyle}>
                            {quantity}
                        </Text>
                        <TouchableOpacity onPress={incrementQty}>
                            <Avatar.Icon 
                                icon={'plus'}
                                {...iconOptions} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                    <TouchableOpacity activeOpacity={0.9} onPress={addToCartHandler}>
                        <Button
                            icon={'cart'}
                            style={styles.buttonStyle}
                            textColor={colors.color2}>
                            Add to Cart
                        </Button>
                    </TouchableOpacity>

            </View>
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
        backgroundColor: colors.color1,
        width: ITEM_WIDTH,
        paddingVertical: 40,
        height: 380,
    },
    image: {
        width: ITEM_WIDTH,
        resizeMode: "contain",
        height: 250,
    },
    quantityStyle: {
        backgroundColor: colors.color4,
        height: 25,
        width: 25,
        textAlignVertical: "center",
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.color5,
        marginHorizontal: 10,
    },
    buttonStyle: {
        backgroundColor: colors.color3,
        borderRadius: 100,
        padding: 5,
        marginVertical: 35,
    },
});

export default ProductDetails;
