import { StyleSheet } from "react-native";
import { textColor } from "../assets/colors";

const fontFamily = StyleSheet.create({
    bold: {
        fontFamily: "Poppins-Bold"
    },
    regular: {
        fontFamily: "Poppins-Regular"
    }
})

export default StyleSheet.create({
    container: {
        padding: 20,
    },
    heading: {
        fontSize: 32,
        fontWeight: '700',
        color: textColor.black,
        ...fontFamily.bold,
    },
    subHeading: {
        fontSize: 14,
        color: textColor.grey,
        ...fontFamily.regular,
    },
    title: {
        fontSize: 26,
        color: textColor.white,
        ...fontFamily.bold,
    },
    buttonWhite: {
        fontSize: 12,
        color: textColor.white,
        ...fontFamily.bold
    },
    fontRegular: {
        ...fontFamily.regular
    },
    fontBold: {
        ...fontFamily.bold
    }
})