import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { CommonHeader } from "@/components/CommonHeader";
import { Href, useRouter } from "expo-router";
import { commonStyles } from "@/assets/css/common_styles";
import { FontAwesome5 } from "@expo/vector-icons";

type Category = {
    id: number;
    title: string;
    image: any;
};


const categories: Category[] = [
    {
        id: 1,
        title: "Fashion & Lifestyle",
        image: require("../assets/images/dp.jpg"),
    },
    {
        id: 2,
        title: "Electronics & Appliances",
        image: require("../assets/images/dp.jpg"),
    },
];


export default function Category() {
    const router = useRouter();

    return (
        <View style={commonStyles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                {/* COMMON HEADER */}
                <CommonHeader
                    type="buyer"
                    userName="Randika Perera"
                    greeting="Good Morning!"
                    profileRoute="/buyer-profile"
                />

                {/* CONTENT */}
                <View style={styles.content}>
                    <Text style={styles.pageTitle}>Select your Category</Text>

                    <View style={styles.grid}>
                        {categories.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                activeOpacity={0.9}

                            >
                                <ImageBackground
                                    source={item.image}
                                    style={styles.image}
                                    imageStyle={styles.imageRadius}
                                >
                                    <View style={styles.overlay} />

                                    <View style={styles.cardFooter}>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                        <View style={styles.arrowCircle}>
                                            <FontAwesome5
                                                name="arrow-right"
                                                size={14}
                                                color="#fff"
                                            />
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: "48%",
        height: 160,
        marginBottom: 16,
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",
    },
    imageRadius: {
        borderRadius: 18,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.25)",
        borderRadius: 18,
    },
    cardFooter: {
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTitle: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
        flex: 1,
        marginRight: 8,
    },
    arrowCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#28C76F",
        justifyContent: "center",
        alignItems: "center",
    },
});
