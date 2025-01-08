import React from "react";
import { Control, Controller } from "react-hook-form";
import { NewProduct } from "./newProductResolver";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type CustomInputProps = {
  control: Control<NewProduct>;
  name: keyof NewProduct;
} & TextInputProps;
const Input = ({ control, name, ...rest }: CustomInputProps) => {
  const color = useThemeColor({ light: "black", dark: "white" }, "text");
  const {
    _formState: { errors },
  } = control;

  const labels = {
    name: "Nombre",
    brand: "Marca",
    measure: "Medida",
    costPrice: "Costo",
  };

  const placeholderValues = {
    name: "Leche entera UHT",
    brand: "Colanta",
    measure: "1 L",
    costPrice: "3500",
  }

  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({
          field: { name, onChange, value = "", onBlur },
          fieldState:{error},
        }) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingHorizontal: 15,
                }}
              >
                <Text children={labels[name]} style={{ color }} />
                {error && (
                  <Text
                    children={error?.message}
                    style={{ color: "red" }}
                  />
                )}
              </View>
              <TextInput
                style={[{ color }, styles.input]}
                placeholder={placeholderValues[name]}
                autoCorrect={false}
                placeholderTextColor="gray"
                onChangeText={onChange}
                value={String(value)}
                onBlur={onBlur}
                {...rest}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 99,
    paddingLeft: 15,
    fontSize: 15,
    height: 45,
  },
});

export default Input;
