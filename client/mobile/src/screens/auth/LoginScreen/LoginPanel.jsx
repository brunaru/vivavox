import React from "react";
import { View, TextInput, Pressable, Text, StyleSheet, Button } from 'react-native';

export default function LoginPanel({
    email,
    password,
    setEmail,
    setPassword, 
    onSubmit, 
    error
}) {
    return(
        /*<View style={styles.panel}>
            <Text style={styles.title}>Entrar</Text>
            <TextInput 
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput 
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable style={styles.button} onPress={onSubmit}>
                <Text> Entrar </Text>
            </Pressable>
        </View>*/
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>

      <TextInput
        placeholder="Email"
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, color: "black"}}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="black"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth: 1, marginBottom: 10, padding: 10, color:"black"}}
      />

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Button title="Entrar" onPress={onSubmit} />

    </View>
    );
}

/*const styles = StyleSheet.create({
    panel:{
        
    },
    title:{
        
    },
    input:{

    },
    error:{

    },
    button:{

    },
});
*/