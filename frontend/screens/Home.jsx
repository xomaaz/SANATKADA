import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import { Avatar, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import SearchModal from '../components/SearchModal';
import ProductCard from '../components/ProductCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import Heading from '../components/Heading';
import { getAllProducts } from "../redux/actions/productAction";
import { useSetCategories } from '../utils/hooks';

const categories = [
    {category: "Flacko", _id: "001"}, 
    {category: "A$AP", _id: "002"}, 
    {category: "Devin", _id: "003"}, 
    {category: "Craka", _id: "004"},
    {category: "Maaz", _id: "005"},
    {category: "Syed", _id: "006"},
    {category: "Shah", _id: "007"}
]

const Home = () => {
    const [category, setCategory] = useState("")
    const [activeSearch, setActiveSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [categories, setCategories] = useState([]);
 
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { products } = useSelector((state) => state.product);

    console.log(products)

    const categoryButtonHandler = (id) => {
        setCategory(id);
    } 

    const addToCartHandler = (id) => {
        console.log("Add to Cart", id)
    }

    useSetCategories(setCategories, isFocused);

    useEffect(() => {
        dispatch(getAllProducts(searchQuery, category));
    }, [dispatch, searchQuery, category, isFocused]);
    

  return (
    <>

        {activeSearch && (
            <SearchModal 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            setActiveSearch={setActiveSearch} 
            products={products} 
            />
        )}

        <View style = {defaultStyle}>
            <Header/>

            <View style={{
                paddingTop: 55,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                {/* Heading */}
                <Heading text1='Our' text2='Products' />

                <View>
                    <TouchableOpacity onPress={()=>setActiveSearch((prev)=>!prev)}>
                        <Avatar.Icon 
                        icon={"magnify"}
                        size={50} 
                        color={"gray"} 
                        style={{ backgroundColor:colors.color2, elevation: 12}} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection: "row", height:80}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                    alignItems:"center"
                }}>
                {
                    categories.map((item, index) => (
                        <Button  key={item._id} style={{
                            backgroundColor: category === item._id ? colors.color1 : colors.color5, 
                            borderRadius: 100, 
                            margin: 5}}
                        onPress={()=>categoryButtonHandler(item._id)}
                        >
                        <Text style={{
                            fontSize: 12, 
                            color: category === item._id ? colors.color2 : "gray" }}>{item.category}</Text>
                        </Button>
                    ))
                }
                </ScrollView>
            </View>

            <View style={{ flex:1 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        products.map((item, index) => (
                            <ProductCard
                            stock={item.stock}
                            name={item.name}
                            price={item.price}
                            image={item.images[0]?.url}
                            addToCartHandler={addToCartHandler}
                            id={item._id}
                            key={item._id}
                            i={index}
                            navigate={navigate}
                            />
                        ))
                    }
                </ScrollView>
            </View>

        </View>

        <Footer activeRoute={"Home"} />

    </>
  )
}

export default Home