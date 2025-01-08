import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Product } from "@/model/product";
import axios from "axios";

const ReportNovelty = ({ product }: { product: Product }) => {
  const [showModal, setShowModal] = useState(false);

  const [formState, setFormState] = useState<
    "filling" | "loading" | "success" | "fail" | "trying"
  >("filling");

  const values = {
    costPrice: "costo",
    price: "pvp",
    name: "nombre",
    measure: "medida",
  } as const;

  type ReportValue = keyof typeof values;
  const [selectedValue, setSelectedValue] = useState<ReportValue>("costPrice");
  const [value, setValue] = useState("");
  const color = useThemeColor({ light: "black", dark: "white" }, "text");

  const { barcode, name, image } = product;

  useEffect(() => {
    if (formState === "trying" && value.length < 1) setFormState("filling");
  }, [formState]);

  const sendData = async () => {
    const body = {
      barcode,
      name,
      image,
      key: selectedValue,
      value,
    };

    setFormState("loading");

    await axios
      .post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/novelties/${barcode}?type=validate`,
        body
      )
      .then(() => {
        setFormState("success");
      })
      .catch(() => {
        setFormState("fail");
      });
  };

  return (
    <Pressable style={styles.reportButton} onPress={() => setShowModal(true)}>
      <ThemedText
        style={{ fontWeight: 600, fontSize: 18, lineHeight: 30 }}
        children={"Reportar novedad"}
      />
      {showModal && (
        <Modal
          onRequestClose={() => setShowModal(false)}
          visible={showModal}
          transparent
        >
          <View style={styles.reportModalLayer}>
            <ThemedView
              style={[
                styles.alert,
                {
                  opacity: formState !== "filling" || value.length < 1 ? 1 : 0,
                },
              ]}
              children={
                <ThemedText>
                  {value.length < 1
                    ? "Seleccione e ingrese el nuevo valor a revisar"
                    : (() => {
                        switch (formState) {
                          case "success":
                            return "Gracias! Reporte enviado con éxito";
                          case "trying":
                            return "Deja oprimido para enviar";
                          case "loading":
                            return "Enviando reporte";
                          case "fail":
                            return "No se pudo enviar el reporte";
                        }
                      })()}
                </ThemedText>
              }
            />
            <ThemedView style={{ padding: 10, gap: 10 }}>
              <View style={{ flexDirection: "row", gap: 15 }}>
                {Object.keys(values).map((value, index) => (
                  <Pressable
                    style={{
                      borderColor:
                        value === selectedValue ? "gray" : "transparent",
                      borderWidth: 1,
                      paddingHorizontal: 8,
                      borderRadius: 3,
                      paddingVertical: 4,
                    }}
                    key={index + value}
                    onPress={() => setSelectedValue(value as ReportValue)}
                  >
                    <ThemedText children={values[value as ReportValue]} />
                  </Pressable>
                ))}
              </View>
              <TextInput
                style={[{ color }, styles.reportInput]}
                placeholder="Nuevo valor"
                placeholderTextColor="gray"
                value={value}
                onChangeText={(v) => setValue(v)}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                <Pressable
                  style={styles.button}
                  onPress={() => setShowModal(false)}
                  children={
                    <ThemedText
                      children={"Cancelar"}
                      style={{ color, opacity: 0.7 }}
                    />
                  }
                />

                <Pressable
                  style={styles.button}
                  onPress={() =>
                    formState !== "success"
                      ? setFormState("trying")
                      : setShowModal(false)
                  }
                  onLongPress={() =>
                    formState !== "success" ? sendData() : setShowModal(false)
                  }
                  children={
                    <ThemedText
                      children={(() =>
                        formState !== "success"
                          ? "Enviar reporte"
                          : "Cerrar")()}
                      style={{ color, opacity: 0.7 }}
                    />
                  }
                />
              </View>
            </ThemedView>
          </View>
        </Modal>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  reportInput: {
    borderColor: "grey",
    borderBottomWidth: 1,
    borderRadius: 5,
    fontSize: 15,
  },
  reportButton: {
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 10,
    borderRadius: 99,
    marginTop: 30,
  },
  reportModalLayer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 4,
  },
  alert: {
    position: "fixed",
    borderRadius: 99,
    zIndex: 100,
    paddingVertical: 2,
    paddingHorizontal: 10,
    margin: 10,
  },
});

export default ReportNovelty;
