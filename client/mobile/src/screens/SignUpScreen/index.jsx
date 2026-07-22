import React, {useState} from "react";
import { TextInput, Text, StyleSheet } from "react-native";
import { useUser } from "../../contexts/userContext";
import { useDevice } from "../../hooks/useDevice";
import { useNavigation } from "@react-navigation/native"

import AuthForm from "../../components/authentication/AuthForm";
import AuthFooter from "../../components/authentication/AuthFooter";
import LayoutMobile from "../../components/authentication/LayoutMobile";
import LayoutTablet from "../../components/authentication/LayoutTablet";

export default function SignUpScreen () {
    const { signUpUser } = useUser();
    const { isTablet } = useDevice();
    const navigation = useNavigation();

    const Layout = isTablet ? LayoutTablet : LayoutMobile

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSignUp() {
        setError("");
        if (password != confirmPassword){
            setError("As senhas não coincidem!");
            return;
        } try{
            await signUpUser({
                name, 
                email,
                password,
                confirmedPassword: confirmPassword,
            })
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        } catch (err){
            setError("Erro ao criar uma conta")
        }
    }

    return(
        <Layout>
            <AuthForm
                formText="Criar conta"
                buttonText="Cadastrar"
                onSubmit={handleSignUp}
                error={error}
            >
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    maxLength={100}
                />
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
                <Text style={styles.label}>Confirmar senha:</Text>
                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                    secureTextEntry
                    maxLength={100}
                />
            </AuthForm>
            <AuthFooter
                question="Já tem uma conta?"
                link=" Entrar"
                onPress={() => navigation.navigate("Login")}
            />
        </Layout>
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
});