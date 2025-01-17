import React, { useState } from 'react';
import { Button, Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

import { connect } from 'react-redux';

const LoginScreen = (props) => {


    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ error, setError ] = useState('');

    const getSignIn = async () => {
        
        const responseFromServer = await fetch('https://my-tieks-0001.herokuapp.com/sign-in', {
            method: 'POST',
            headers: { "Content-Type" : "application/x-www-form-urlencoded" },
            body: `email=${email}&password=${password}`
        });

        const responseFromServerJson = await responseFromServer.json()
        console.log(responseFromServerJson)

        const userToken = responseFromServerJson.token
        const result = responseFromServerJson.result
        

        if (result) {
            //console.log(userToken)
            props.navigation.navigate('MapScreen')
            props.onSubmitToken(userToken)
        } else {
            setError('Please go to the sign up page')
            return error
        }

    }

    return(


        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
         
            <Image
                source={require('../assets/Login.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>My Tieks</Text>

            <Text>{ error }</Text>

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={ false }
            />
            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                value={password}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton
            buttonTitle="Sign In"
            onPress={() => getSignIn()}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                <Text style={styles.navButtonText}>Mot de Passe Oublié ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotButton} onPress={() => props.navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>Pas encore de compte? S'enregistrer </Text>
            </TouchableOpacity>
            
        </KeyboardAvoidingView>
       
      
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#449CA6',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 40,
        marginBottom: 30,
        color: '#FDF2AB',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    dontHaveButton: {
        marginVertical: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FDF2AB',
    }
});


function mapDispatchToProps(dispatch) {
    return {
        onSubmitToken: function(tokenUser) {
            dispatch({
                type: 'saveToken',
                token: tokenUser
            })
        }
    }
}
export default connect (
    null,
    mapDispatchToProps
) (LoginScreen);

