// context.tsx
import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';

type MyContextType = {
  minhaVariavel: string;
  setMinhaVariavel: React.Dispatch<React.SetStateAction<string>>;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider: FC<MyContextProviderProps> = ({ children }) => {
  const [minhaVariavel, setMinhaVariavel] = useState('');

  if (process.env.NODE_ENV !== 'production' && typeof window === 'undefined') {
    console.warn('MyContextProvider is being used outside of a browser environment. Make sure to use it within a component tree.');
  }

  useEffect(() => {
    const handleBeforeHistoryChange = ():any => {
      // Faça o que for necessário para atualizar o estado do contexto
      // Você pode acessar informações da rota aqui, se necessário
      setMinhaVariavel(''); // Exemplo: resetar a variável ao mudar de página
    };

    // Adiciona o ouvinte para lidar com mudanças de rota
    window.addEventListener('beforeHistoryChange', handleBeforeHistoryChange);

    // Remove o ouvinte quando o componente é desmontado
    return () => {
      window.removeEventListener('beforeHistoryChange', handleBeforeHistoryChange);
    };
  }, []); // Certifique-se de ajustar dependências conforme necessário

  return (
    <MyContext.Provider value={{ minhaVariavel, setMinhaVariavel }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);

  return context || { minhaVariavel: '', setMinhaVariavel: () => {} };
};
