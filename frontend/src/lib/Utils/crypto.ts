const AES_GCM_PARAMS = {
	name: 'AES-GCM',
	length: 256,
};

export const createEcdhKey = async (): Promise<CryptoKeyPair> => {
	const ecdhKey = await window.crypto.subtle.generateKey(
		{ name: 'ECDH', namedCurve: 'P-384' },
		true,
		['deriveKey'],
	);
	return ecdhKey;
};

export const deriveSharedKey = async (
	privateKey: CryptoKey,
	publicKey: CryptoKey,
): Promise<CryptoKey> => {
	const sharedKey = await window.crypto.subtle.deriveKey(
		{ name: 'ECDH', public: publicKey },
		privateKey,
		AES_GCM_PARAMS,
		false,
		['encrypt', 'decrypt'],
	);
	return sharedKey;
};

export const encryptMessage = async (
	sharedKey: CryptoKey,
	plaintext: Uint8Array,
): Promise<[Uint8Array, Uint8Array]> => {
	const iv = await window.crypto.getRandomValues(new Uint8Array(12));
	const ciphertext = await window.crypto.subtle.encrypt(
		{ ...AES_GCM_PARAMS, iv },
		sharedKey,
		plaintext,
	);

	return [new Uint8Array(ciphertext), iv];
};

export const decryptMessage = async (
	sharedKey: CryptoKey,
	ciphertext: Uint8Array,
	iv: Uint8Array,
): Promise<Uint8Array> => {
	const plaintext = await window.crypto.subtle.decrypt(
		{ ...AES_GCM_PARAMS, iv },
		sharedKey,
		ciphertext,
	);
	return new Uint8Array(plaintext);
}

export const exportKey = async (key: CryptoKey): Promise<Uint8Array> => (
	new Uint8Array(await window.crypto.subtle.exportKey('raw', key))
);
