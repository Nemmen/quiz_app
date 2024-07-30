import React from 'react';
import {Button, View} from 'react-native';
import Mailer from 'react-native-mail';
import Toast from 'react-native-toast-message';

const sendEmail = () => {
  Mailer.mail(
    {
      subject: 'Need help',
      recipients: ['mukultiwari9000@gmail.com'],
      ccRecipients: ['cc@example.com'],
      bccRecipients: ['bcc@example.com'],
      body: '<b>Bolded Body Content</b>',
      isHTML: true,
      attachment: {
        path: '/path/to/file.pdf', // The absolute path of the file from which you want to send an attachment
        type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        name: 'file.pdf', // Optional: Custom filename for attachment
      },
    },
    (error, event) => {
      if (error) {
        console.log('Email Error:', error);
      }
      showToast(event)
    },
  );
};

const showToast = val => {
  Toast.show({
    type: 'success',
    text1: val,
	
  });
};

// Example usage in a component
const SendMail = () => {
  return (
    <View>
      <Button title="Send Email" onPress={sendEmail} />
      <Toast />
    </View>
  );
};

export default SendMail;
