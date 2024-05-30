import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import { Avatar, Button } from 'react-native-paper';
import SearchModal from '../components/SearchModal';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';



const categories = [
    {category: "Flacko", _id: "001"}, 
    {category: "A$AP", _id: "002"}, 
    {category: "Devin", _id: "003"}, 
    {category: "Craka", _id: "004"},
    {category: "Maaz", _id: "005"},
    {category: "Syed", _id: "006"},
    {category: "Shah", _id: "007"}
]

const products = [{
    price: 349,
    stock: 23,
    name:"YEEZY",
    _id: "001",
    images: [
        {
            url: "https://image.goat.com/attachments/product_template_pictures/images/078/084/523/original/64795_00.png.png"
        }
    ]
},
{
    price: 549,
    stock: 23,
    name:"YEEZY V2",
    _id: "002",
    images: [
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/7/72/Adidas_Yeezy_Boost_350_Pirate_Black.gif"
        }
    ]
}];

const Home = () => {



    const [category, setCategory] = useState("")
    const [activeSearch, setActiveSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
 
    const navigate = useNavigation();

    const categoryButtonHandler = (id) => {
        setCategory(id);
    } 

    const addToCartHandler = (id) => {
        console.log("Add to Cart", id)
    }

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

                <View>
                    <Text style = {{ fontSize:25, fontWeight:"300" }}>Our</Text>    
                    <Text style = {{ fontSize:25, fontWeight:"500" }}>Products</Text>
                </View> 

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