import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, AsyncStorage, ToastAndroid, BackHandler } from 'react-native';
import { Button, Picker } from "native-base";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { UseProductContext } from "../context/Product";

interface Props {
    navigation: any;
}
const AddProduct: React.FC<Props> = ({ navigation }) => {
    const { product, updateProdData, clearState } = UseProductContext(); 
    const { name, price, type } = product;
   
    const [errorMsg, setErrorMsg] = useState<string>('');
    const saveProduct: () => Promise<void> = async () => {
        if(type == 'integrated' && (price <= '1000' || price >='2600' ) ){
           return setErrorMsg('Integrated products maybe anywhere within the range of 1000 and 2600 dollars.')
        }if(type  == 'peripheral' && price < '0'){

        return setErrorMsg('Peripheral products can have any price larger than $0 (zero)')
        }
        let getData = await AsyncStorage.getItem('data')
        console.log(getData)
        if (getData) {
            let dd = JSON.parse(getData)
             
            dd.data.push({
                id: Math.random().toString(36).substring(7),
                name: name,
                price: price,
                type: type
            })
            AsyncStorage.setItem('data', JSON.stringify(dd));
            ToastAndroid.showWithGravity(
                "Product added Successfully 👍",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            setErrorMsg('')
            clearState()
        }

        else {
            let data = {
                data: [{
                    id: Math.random().toString(36).substring(7),
                    name: name,
                    price: price,
                    type: type
                }]
            }

            AsyncStorage.setItem('data', JSON.stringify(data));
        }
        clearState()


    }

    console.log(errorMsg, "errororororo")

    const productsData: () => Promise<void> = async () => {
        let getData = await AsyncStorage.getItem('data')
        let res = JSON.parse(getData);
        console.log("res", res)
    }
    useEffect(() => {
        productsData();
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    }, [])
    useEffect(() => {

    }, [])

    const handleBackPress = () => {
        navigation.reset({
            routes: [{ name: 'Home' }],
        });

        return true;
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Create New Product</Text>
            </View>
            <TextInput
                value={name}
                onChangeText={(text) => updateProdData('name', text)} //name value
                style={styles.input}
                placeholder="Name"

            />
            <TextInput
                value={price}
                onChangeText={(text) => updateProdData('price', text)}
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
            />

         {errorMsg ? <Text style={{color: 'red'}}> {errorMsg} </Text>:null}

            <View style={styles.picker}>
                <Picker
                    mode="dropdown"
                    selectedValue={type}
                    onValueChange={(itemValue) =>
                        updateProdData('type', itemValue)
                    }
                    style={{ height: 40 }}
                >
                    <Picker.Item label="Product Type" color="gray" />
                    <Picker.Item label="Integrated" value="integrated" />
                    <Picker.Item label="Peripheral" value="peripheral" />
                </Picker>
            </View>

            <View style={styles.btnsContainer}>
                {/* {name == '' && price == '' && type == '' ?
                 <Button style={styles.saveBtn} >
                 <Text style={styles.saveBtnText}>Not SAVE</Text>
                 <AntDesign name="download" size={18} color="#fff" style={{ marginRight: 10 }} />
             </Button> :  <Button style={styles.saveBtn} onPress={saveProduct}>
                    <Text style={styles.saveBtnText}>SAVE</Text>
                    <AntDesign name="download" size={18} color="#fff" style={{ marginRight: 10 }} />
                </Button> } */}

                <Button style={name == '' && price =='' && type ==''?styles.disableSave : styles.saveBtn  } onPress={name == '' && price =='' && type ==''? null: saveProduct}>
                    <Text style={styles.saveBtnText}>SAVE</Text>
                    <AntDesign name="download" size={18} color="#fff" style={{ marginRight: 10 }} />
                </Button>
               
                <Button  style={styles.cancelBtn} onPress={() => {clearState(); setErrorMsg('')}}>
                    <Text style={styles.cancelBtnText}>CANCEL</Text>
                    <MaterialCommunityIcons name="cancel" size={18} color="gray" style={{ marginRight: 10 }} />
                </Button>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    header: {

        height: 55,
        marginTop: 45
    },
    headerText: {
        color: '#000',
        fontSize: 24,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 5
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    
    saveBtn: {
        backgroundColor: 'green',
        width: 150,
        margin: 5,
        borderRadius: 10,
    },
    disableSave: {
        backgroundColor: '#909090',
        width: 150,
        margin: 5,
        borderRadius: 10,
    },
    cancelBtn: {
        backgroundColor: '#f6f6f6',
        width: 150,
        margin: 5,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10
    },
    saveBtnText: {
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: 'center',
        color: '#fff'
    },
    cancelBtnText: {
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: 'center',
        color: '#000'
    },
    picker: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 60,
        width: '93%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 11,
        borderRadius: 5
    },


})
export default AddProduct;