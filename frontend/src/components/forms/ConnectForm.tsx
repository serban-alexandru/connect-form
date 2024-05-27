import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Checkbox from "expo-checkbox";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as z from "zod";
import { loginSchema } from "../../utils/schema";
import { SelectField } from "../ui/form-fields";

const ConnectForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      accountType: "normal",
      port: 80,
      useSSL: false,
      serverPath: "/",
    },
  });
  const accountType = watch("accountType");

  const onSubmit = async (data) => {
    // to be extracted
    const backendUrl = "http://localhost:3000";
    try {
      await axios.post(`${backendUrl}/data`, data);
      console.log(data);
      alert(JSON.stringify(data));
    } catch {
      console.log("There's been an error. Try again");
      alert("There's been an error. Try again");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <SelectField value={value} onChange={onChange} label="Account Type" />
        )}
        name="accountType"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>User Name</Text>
            <TextInput
              style={[styles.input, errors.username && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
            />
          </>
        )}
        name="username"
      />
      {errors.username && (
        <Text style={styles.errorText}>
          Username is required and must be a valid email address.
        </Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry
            />
          </>
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorText}>
          Password is required and must be at least 6 characters long.
        </Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Server Address</Text>
            <TextInput
              style={[styles.input, errors.serverAddress && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Server Address"
            />
          </>
        )}
        name="serverAddress"
      />
      {errors.serverAddress && (
        <Text style={styles.errorText}>Server Address is required.</Text>
      )}

      {accountType === "advanced" && (
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text>Server Path</Text>
                <TextInput
                  style={[styles.input, errors.serverPath && styles.errorInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Server Path"
                />
              </>
            )}
            name="serverPath"
          />
          {errors.serverPath && (
            <Text style={styles.errorText}>
              Server Path must be alphanumeric with '/' allowed.
            </Text>
          )}

          <Text>Port</Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    style={[
                      styles.input,
                      errors.port && styles.errorInput,
                      {
                        flex: 1,
                      },
                    ]}
                    onBlur={onBlur}
                    // typescript made me do it :(
                    onChangeText={(value) => onChange(Number(value))}
                    value={value ? String(value) : undefined}
                    placeholder="Port"
                    keyboardType="numeric"
                  />
                </>
              )}
              name="port"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.switchContainer}>
                  <Checkbox
                    disabled={false}
                    value={value}
                    onValueChange={onChange}
                  />
                  <Text>Use SSL</Text>
                </View>
              )}
              name="useSSL"
            />
          </View>

          {errors.port && (
            <Text style={styles.errorText}>
              Port must be a number between 1 and 65535.
            </Text>
          )}
        </>
      )}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flex: 1,
    gap: 10,
  },
});

export default ConnectForm;
