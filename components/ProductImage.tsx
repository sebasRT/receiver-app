import { cld } from "@/lib/cloudinary";
import { Image } from "react-native";
import { ThemedView } from "./ThemedView";

const ProductImage = ({ img }: { img: string }) => {
  const cldProductImage = cld.image(img).toURL();

  return (
    <ThemedView style={{width: 'auto', aspectRatio: 1}}>
      <Image source={{ uri: cldProductImage || "" }} style={{width: "100%", height: "100%"}}/>
    </ThemedView>
  );
};

export default ProductImage;
