import ReactNativeBiometrics from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

interface BiometricsInput {
  email: string;
  password: string;
}

export const enableBiometrics = async ({
  email,
  password,
}: BiometricsInput): Promise<boolean> => {
  const { available } = await ReactNativeBiometrics.isSensorAvailable();
  console.log('biometrics | capable?', available);

  if (available) {
    const { success } = await ReactNativeBiometrics.simplePrompt({
      promptMessage: 'Confirm ID',
    });

    console.log('biometrics | confirmed?', success);
    if (success) {
      // TODO: if successful then store within keychain
      await Keychain.setGenericPassword(email, password);
      return true;
    }
  }

  return false;
};

export const loginWitBiometrics = async (): Promise<boolean> => {
  try {
    // Check if details exist in keychain first
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
      );

      const { success } = await ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Confirm ID',
      });

      if (success) {
        // Retrieve the credentials
        return true;
      }
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
  return false;
};

export const logout = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword();

    return true;
  } catch (err) {
    console.log('ERROR: Could not reset keychain password', err);
    return false;
  }
};
