import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Text, StyleSheet } from "react-native";
import { useUser } from "../../../contexts/userContext";
import { useDevice } from "../../../hooks/useDevice";
import { useNavigation } from "@react-navigation/native"

import AuthForm from "../../../components/authentication/AuthForm";
import AuthFooter from "../../../components/authentication/AuthFooter";
import LayoutMobile from "../../../components/authentication/LayoutMobile";
import LayoutTablet from "../../../components/authentication/LayoutTablet";

export default function LoginScreen () {
    const { signInUser } = useUser();
    const { isTablet } = useDevice();
    const navigation = useNavigation();

    const Layout = isTablet ? LayoutTablet : LayoutMobile

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin() {
      try{
        setError("");
        await signInUser({ email, password })
      } catch (err) {
        console.log("LOGIN ERROR:", err);
        console.log("RESPONSE:", err?.response?.data);
        setError(err?.response?.data?.message || "E-mail ou usuário inválidos");
      }
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
          <Layout>
            <AuthForm
                formText="Entrar"
                buttonText="Entrar"
                onSubmit={handleLogin}
                error={error}
                footer={
                   <Text
                      style={styles.forgot}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      Esqueci minha senha
                    </Text>
                }
            >
                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    maxLength={100}
                />
                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                    maxLength={100}
                />
            </AuthForm>
            <AuthFooter
                question="Ainda não tem uma conta?"
                link=" Criar uma conta"
                onPress={() => navigation.navigate("SignUp")}
            />
        </Layout>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    label:{
        fontSize: 18,
        color: "#333",
        marginBottom: 6,
    },
    input:{
        backgroundColor: "#DDDDDD",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 16,
        fontSize: 16,
        color: "black",
    },
    forgot:{ 
      textAlign: "center", 
      color: "#003466", 
      marginTop: 5, 
      fontSize: 15, 
    },
});