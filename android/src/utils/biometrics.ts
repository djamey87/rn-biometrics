import ReactNativeBiometrics from 'react-native-biometrics';

export const enableBiometrics = async (
  stringToStore: string,
): Promise<string | undefined> => {
  let biometricsSignature;

  const { available } = await ReactNativeBiometrics.isSensorAvailable();
  console.log('biometrics | capable?', available);

  if (available) {
    const { keysExist } = await ReactNativeBiometrics.biometricKeysExist();

    console.log('biometrics | available key?', keysExist);

    if (!keysExist) {
      try {
        const { publicKey } = await ReactNativeBiometrics.createKeys();

        console.log('biometrics | key created', publicKey);
        const { success, error, signature } =
          await ReactNativeBiometrics.createSignature({
            promptMessage: 'Scan yo shiz!',
            payload: publicKey,
          });

        if (!error && success) {
          // we gats to do something with the signature
          console.log('biometrics | signature created', signature);
        }
      } catch (err) {
        console.log('somethings gone wrong', err);
      }
    } else {
      // NOTE: shouldn't get here...
      await ReactNativeBiometrics.deleteKeys();
      console.warn('keys removed');
    }
  }

  return biometricsSignature;
};

export const testBioFlow = async (
  toEncode: string,
): Promise<string | undefined> => {
  // Check if biometrics are supported and configured on this device
  const { available } = await ReactNativeBiometrics.isSensorAvailable();

  console.log('testBioFlow | capable?', available);
  if (available) {
    // Prompt user to scan biometrics
    const { success } = await ReactNativeBiometrics.simplePrompt({
      promptMessage: 'Confirm ID',
    });

    if (success) {
      // If scan is successful, generate a keypair, then save the public key seperately in the key chain
      const { publicKey } = await ReactNativeBiometrics.createKeys();

      // post('/save_biometric_key', { key: publicKey, device_id: 'xyz' });

      console.log('testBioFlow', publicKey);
    }
  }
};
