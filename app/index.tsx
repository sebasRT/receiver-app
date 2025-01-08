import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Product } from "@/model/product";
import { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import ProductCard from "@/components/ProductCard";
import NewProductForm from "@/components/forms/NewProductForm";

export default function HomeScreen() {
  const [product, setProduct] = useState<null | Product>(null);
  const [notFound, setNotFound] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setProduct(null);
    axios
      .get(`${process.env.EXPO_PUBLIC_BASE_URL}/api/products/${barcode}`)
      .then((res) => setProduct(res.data))
      .catch((error) => {
        if (error.status === 404) setNotFound(true);
      });
  }, [barcode]);

  const color = useThemeColor({ light: "black", dark: "white" }, "text");

  return (
    <SafeAreaView>
      <TextInput
        style={[{ color }, styles.input]}
        placeholder="Código de barras"
        placeholderTextColor="grey"
        keyboardType="number-pad"
        value={inputValue}
        onChangeText={(v) => setInputValue(v)}
        onEndEditing={() => {
          setBarcode(inputValue);
          setInputValue("");
          setNotFound(false);
        }}
      />
      <View>{product && !notFound && <ProductCard product={product} />}</View>
      {notFound && (
        <View>
          <ThemedText type="subtitle" style={{textAlign: "center", opacity: 0.8}}>Nuevo Producto</ThemedText>
          <NewProductForm barcode={barcode}/>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 99,
    paddingLeft: 15,
    fontSize: 15,
    height: 45,
  },
});
