import { Product, StockStatus } from "@/model/product";
import ProductImage from "./ProductImage";
import ReportNovelty from "./ReportNovelty";
import { ThemedText } from "./ThemedText";
import { StyleSheet, Text, View } from "react-native";
import { formatPrice } from "@/globalFunctions";
import { Button } from "react-native-elements";
import { useState } from "react";
import axios from "axios";
import { headers } from "@/utils/consts";

const ProductCard = ({ product }: { product: Product }) => {
  const {
    name,
    brand,
    barcode,
    searchString,
    price,
    measure,
    image,
    costPrice,
    stockStatus,
  } = product;

  const [status, setStatus] = useState(stockStatus);

  const statusMessage = {
    out: "Agotado",
    low: "Poco",
    available: "Disponible",
  };

  const stockStatusColor = {
    out: "#ef4444",
    low: "#fbbf24",
    available: "#22c55e",
  };

  const setStockStatus = async (newStockStatus: StockStatus) => {
     await axios
      .patch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/products/${barcode}`, {
        stockStatus: newStockStatus,
      }, {headers})
      .then(() => setStatus(newStockStatus))
      .catch((e) => console.log(e));
  };

  return (
    <View
      style={{
        alignItems: "center",
        padding: 20,
        borderStartColor: stockStatusColor[status],
        borderColor: "transparent",
        borderWidth: 10,
      }}
    >
      <Text
        style={{
          color: stockStatusColor[status],
          position: "fixed",
          top: -20,
        }}
      >
        {statusMessage[status]}
      </Text>
      <View
        style={styles.productImage}
        children={<ProductImage img={image} />}
      />
      <ThemedText
        children={brand}
        style={{ fontWeight: 300, fontSize: 20, lineHeight: 30 }}
      />
      <ThemedText
        style={styles.productName}
        children={`${name} - ${measure}`}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginVertical: 30,
        }}
      >
        <View>
          <ThemedText style={styles.productPriceLabel} children={"Costo"} />
          <ThemedText type="title" children={formatPrice(costPrice)} />
        </View>
        <View style={{ opacity: 0.7 }}>
          <ThemedText style={styles.productPriceLabel} children={"Publico"} />
          <ThemedText
            style={styles.productPrice}
            children={formatPrice(price)}
          />
        </View>
      </View>
      <ReportNovelty product={product} />
      <View style={{ flexDirection: "row", gap: 10, marginTop: 30 }}>
        <Button
          title="Escaso"
          containerStyle={{
            flex: 1,
            display: status === "low" ? "none" : "flex",
          }}
          buttonStyle={{ backgroundColor: "#fbbf24" }}
          titleStyle={{ color: "#334155" }}
          onPress={() => setStockStatus("low")}
        />
        <Button
          title="Disponible"
          containerStyle={{
            flex: 1,
            display: status === "available" ? "none" : "flex",
          }}
          buttonStyle={{ backgroundColor: "#22c55e" }}
          onPress={() => setStockStatus("available")}
        />
        <Button
          title="Agotado"
          containerStyle={{
            flex: 1,
            display: status === "out" ? "none" : "flex",
          }}
          buttonStyle={{ backgroundColor: "#ef4444" }}
          onPress={() => setStockStatus("out")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  productName: { fontWeight: 300, fontSize: 25, lineHeight: 30 },
  productPriceLabel: {
    fontWeight: 300,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 5,
  },
  productPrice: { fontWeight: 400, fontSize: 25, lineHeight: 30 },
});

export default ProductCard;
