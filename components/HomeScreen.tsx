import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, AsyncStorage, Alert } from 'react-native';

import {
    SwipeableFlatList,
    SwipeableQuickActionButton,
    SwipeableQuickActions,
} from 'react-native-swipe-list';
interface datatypes {
    id: string,
    name: string;
    price: string;
    type: string;
}
interface Props {
    navigation: any;
}
const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [data, setData] = useState<datatypes[]>([]);
    const productsData = async () => {
        let getData = await AsyncStorage.getItem('data');
        let listData = JSON.parse(getData);
        console.log('list data', listData)
        setData(listData.data);
    }
    useEffect(() => {
        productsData()
    }, [])

    const deleteProduct = async (id) => {
        let getData = await AsyncStorage.getItem('data');
        let listData = JSON.parse(getData);
        let dltIndex;
        let filtered = listData.data.filter(function (item, index) { dltIndex = index; return item.id == id; });
        if (!filtered.length) {
            return false;
        }

        listData.data.splice(dltIndex, 1);
        setData(listData.data)
        AsyncStorage.setItem('data', JSON.stringify(listData));
    }

    const askToDelete = async (item) => {

        Alert.alert(
            'Delete',
            `Are you sure you want to delete this product? `,
            [
                {
                    text: 'No',
                    onPress: () => console.log('he;;o'),
                },
                { text: 'Yes', onPress: () => deleteProduct(item) },
            ],
            {
                cancelable: false,
            },
        );
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Items</Text>
            </View>

            <View style={styles.tabs}>
                <Text style={styles.tabText}>Name</Text>
                <Text style={styles.tabText}>Type</Text>
                <Text style={styles.tabText}>Price</Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            {data.length > 0 ?

                <SwipeableFlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (

                            <View style={styles.tabs2} key={index}>
                                <Text style={styles.tabText}>{item.name}</Text>
                                <Text style={styles.tabText}>{item.type}</Text>
                                <Text style={styles.tabText}>{item.price}</Text>

                            </View>


                        )
                    }}
                    renderRightActions={({ item }) => (
                        <SwipeableQuickActions>
                            <SwipeableQuickActionButton
                                onPress={() => askToDelete(item.id)}
                                text="Delete"
                                textStyle={{ fontSize: 24, padding: 10, color: '#fff' }}

                                style={{ backgroundColor: "red" }}
                            />
                        </SwipeableQuickActions>
                    )}
                />

                : <Text style={styles.noDataText}>You do not have any products. Press the green button below to add a new one. </Text>}
            <Pressable style={styles.button} onPress={() => navigation.navigate('Add')}>
                <Text style={styles.text}>+</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: 'green',
        height: 55,
        marginTop: 45
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        margin: 10
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    tabs2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        borderColor: 'red',
        borderWidth: 1,
        padding: 10
    },
    tabText: {
        fontSize: 18
    },
    noDataText: {
        marginTop: 'auto',
        marginBottom: 'auto',
        textAlign: 'center',
        color: 'gray',
        fontSize: 20
    },
    addBtn: {
        width: 50,
        borderRadius: 25,
    },
    button: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    text: {
        fontSize: 48,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'white',
    },

})
export default HomeScreen;