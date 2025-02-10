import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { NewProduct, newProductSchema } from "./newProductResolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import axios from "axios";
import { ThemedText } from "../ThemedText";
import { headers } from "@/utils/consts";

const NewProductForm = ({ barcode }: { barcode: string }) => {
  const [formState, setFormState] = useState<
    "filling" | "loading" | "success" | "fail"
  >("filling");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
  });

  const sendData = async (data: NewProduct) => {
    setFormState("loading");

    const body = {
      barcode,
      ...data,
      costPrice: Number(data.costPrice),
    };

    await axios
      .post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/novelties/${barcode}?type=new_product`,
        body , {headers}
      )
      .then(() => setFormState("success"))
      .catch(() => setFormState("fail"));
  };

  return (
    <View style={{ height: "100%", paddingTop: 40 }}>
      {(() => {
        switch (formState) {
          case "filling":
            return (
              <View style={{ gap: 30, padding: 10 }}>
                <Input control={control} name="name" />
                <Input control={control} name="brand" />
                <Input control={control} name="measure" />
                <Input
                  control={control}
                  name="costPrice"
                  keyboardType="decimal-pad"
                />
                <Pressable
                  onPress={handleSubmit(sendData)}
                  style={{ alignItems: "center" }}
                  children={
                    <ThemedText
                      children={"Enviar datos"}
                      style={styles.sendData}
                    />
                  }
                />
              </View>
            );
          case "loading":
            return <ActivityIndicator />;
          case "success":
            return (
              <ThemedText
                children={"Datos enviados exitosamente !"}
                style={{ textAlign: "center" }}
              />
            );
          case "fail":
            return (
              <ThemedText
                children={"Hubo un error al enviar los datos  !"}
                style={{ textAlign: "center" }}
              />
            );
        }
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  sendData: {
    fontSize: 20,
    textAlign: "center",
    width: "auto",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "gray",
  }
});
export default NewProductForm;
