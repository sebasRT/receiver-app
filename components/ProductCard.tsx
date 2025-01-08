import { Product } from "@/model/product";
import ProductImage from "./ProductImage";
import ReportNovelty from "./ReportNovelty";
import { ThemedText } from "./ThemedText";
import { StyleSheet, View } from "react-native";
import { formatPrice } from "@/globalFunctions";

const ProductCard = ({ product }: { product: Product }) => {
  const { name, brand, searchString, price, measure, image, costPrice } =
    product;
  return (
    <View style={{ alignItems: "center", padding: 30 }}>
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
