'use client';

import { useState, useEffect } from 'react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { PublicKey } from '@solana/web3.js';

// Добавляем константу для program id метаданных
const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

// Функция для вычисления PDA метаданных
function getMetadataPda(mint: PublicKey): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  return pda;
}

// Функция для вычисления PDA мастер-издания
function findMasterEditionPda(umi: any, { mint }: { mint: PublicKey }): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  return pda;
}

// Функция для получения данных цифрового актива (возвращает сырые данные аккаунта)
async function fetchDigitalAsset(umi: any, mint: PublicKey): Promise<any> {
  try {
    const metadataPda = getMetadataPda(mint);
    const accountInfo = await umi.connection.getAccountInfo(metadataPda);
    return accountInfo;
  } catch (error) {
    return null;
  }
}

export default function TokenInfo() {
  const [mintInput, setMintInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [metadataPda, setMetadataPda] = useState<string | null>(null);

  const getTokenInfo = async () => {
    if (!mintInput) {
      alert("Введите адрес mint!");
      return;
    }
    try {
      setLoading(true);

      // Создаем UMI instance на devnet
      const umi = await createUmi("https://api.devnet.solana.com");

      // Преобразуем строку mint в PublicKey из @solana/web3.js
      const mintPk = new PublicKey(mintInput);

      // Вычисляем PDA для метаданных с помощью новой функции
      const pda = getMetadataPda(mintPk);
      setMetadataPda(pda.toString());

      // Вычисляем PDA для master edition (если применимо)
      let masterEditionPda;
      try {
        masterEditionPda = findMasterEditionPda(umi, { mint: mintPk });
      } catch (error) {
        masterEditionPda = null;
      }

      // Пытаемся получить данные цифрового актива
      let asset;
      try {
        asset = await fetchDigitalAsset(umi, mintPk);
      } catch (error) {
        asset = null;
      }

      // Формируем текст для вывода
      let message = `Информация о токене:
Mint: ${mintInput}
Metadata PDA: ${pda.toString()}
Master Edition PDA: ${masterEditionPda ? masterEditionPda.toString() : "не найден"}
`;

      if (asset) {
        message += `Детали цифрового актива: ${JSON.stringify(asset, null, 2)}`;
      } else {
        message += `Данных цифрового актива не получено.`;
      }

      // Выводим информацию в консоль
      console.log("Информация о токене:");
      console.log("Mint:", mintInput);
      console.log("Metadata PDA:", pda.toString());
      if (masterEditionPda) {
        console.log("Master Edition PDA:", masterEditionPda.toString());
      } else {
        console.log("Master Edition PDA: не найден");
      }
      if (asset) {
        console.log("Детали цифрового актива:", asset);
      } else {
        console.log("Данные цифрового актива не получены.");
      }

      // Показать alert с информацией
      alert(message);
    } catch (error) {
      console.error("Ошибка:", error);
      alert(`Ошибка: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      // Замените этот mint-адрес на действительный mint-адрес NFT
      const mint = new PublicKey("YOUR_NFT_MINT_ADDRESS");
      const pda = getMetadataPda(mint);
      setMetadataPda(pda.toString());
    } catch (error) {
      console.error("Ошибка при вычислении PDA, проверьте mint-адрес:", error);
      // Можно оставить значение metadataPda как null, пока не введут корректный адрес
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Проверка информации о токене</h1>
      <input
        type="text"
        placeholder="Введите адрес mint"
        value={mintInput}
        onChange={(e) => setMintInput(e.target.value)}
        className="px-3 py-2 border border-gray-300 mb-4 w-full text-black"
      />
      <button
        onClick={getTokenInfo}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Получить информацию'}
      </button>
      {metadataPda && <p className="mt-4">Metadata PDA: {metadataPda}</p>}
    </div>
  );
} 