const AES_GCM_PARAMS = {
	name: 'AES-GCM',
	length: 256,
};

export const createEcdhKey = async (): CryptoKeyPair => {
	const ecdhKey = await window.crypto.subtle.generateKey(
		{ name: 'ECDH', namedCurve: 'P-384' },
		false,
		['deriveKey'],
	);
	return ecdhKey;
};

export const deriveSharedKey = async (
	privateKey: CryptoKey,
	publicKey: CryptoKey,
): CryptoKey => {
	const sharedKey = await window.crypto.subtle.deriveKey(
		{ name: 'ECDH', public: publicKey },
		privateKey,
		AES_GCM_PARAMS,
		false,
		['encrypt', 'decrypt'],
	);
	return sharedKey;
};

const encryptMessage = async (
	sharedKey: CryptoKey,
	plaintext: Uint8Array,
): [Uint8Array, Uint8Array] => {
	const iv = window.crypto.getRandomValues(new Uint8Array(12));
	const ciphertext = await window.crypto.subtle.encrypt(
		{ ...AES_GCM_PARAMS, iv },
		sharedKey,
		plaintext,
	);
	return [ciphertext, iv];
};

const decryptMessage = async (
	sharedKey: CryptoKey,
	ciphertext: Uint8Array,
	iv: Uint8Array,
): Uint8Array => {
	const plaintext = window.crypto.subtle.decrypt(
		{ ...AES_GCM_PARAMS, iv },
		sharedKey,
		ciphertext,
	);
	return plaintext;
}
