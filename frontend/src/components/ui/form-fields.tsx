import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome"; // Import your desired icon library

export const SelectField = ({
  value,
  onChange,
  label,
  placeholder,
}: {
  value: string;
  onChange: (...event: any[]) => void;
  label?: string;
  placeholder?: string;
}) => {
  return (
    <View>
      {label && <Text>{label}</Text>}
      <RNPickerSelect
        value={value}
        onValueChange={onChange}
        placeholder={
          placeholder
            ? {
                label: placeholder,
              }
            : {}
        }
        items={[
          { label: "Advanced", value: "advanced" },
          { label: "Normal", value: "normal" },
        ]}
        style={{
          inputIOS: {
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginBottom: 8,
          },
          inputAndroid: {
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginBottom: 8,
          },
        }}
        Icon={() => (
          <Icon
            name="angle-down"
            size={24}
            color="black"
            style={styles.iconStyle}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginTop: 5,
    marginRight: 10,
  },
});
