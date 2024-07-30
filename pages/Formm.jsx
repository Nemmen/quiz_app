import React from 'react';
import {View, TextInput, Button,Text, StyleSheet} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
	.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const Formm = () => {
  return (
    <View >
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => c.l(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.password}
              </Text>
            )}
            <Button onPress={handleSubmit} title="LOGIN" disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
	width: 290,
    marginBottom: 20,
  },


});

export default Formm;
