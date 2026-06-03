import { createContext, useContext, useState, ReactNode } from 'react';

export interface DeliveryAddress {
  id: string;
  city: string;
  street: string;
  building: string;
  office?: string;
  isDefault: boolean;
}

interface User {
  inn: string;
  email: string;
  phone: string;
  fullName: string;
  position: string;
  clinicName: string;
  clinicAddress: string;
  city: string;
  savedAddresses: DeliveryAddress[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (inn: string, password: string) => boolean;
  register: (data: RegisterData) => boolean;
  logout: () => void;
  addAddress: (address: Omit<DeliveryAddress, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

interface RegisterData {
  inn: string;
  email: string;
  phone: string;
  fullName: string;
  position: string;
  clinicAddress: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (inn: string, password: string): boolean => {
    // Имитация входа
    if (password.length >= 8) {
      setUser({
        inn,
        email: 'clinic@example.com',
        phone: '+7 (999) 123-45-67',
        fullName: 'Иванова Анна Сергеевна',
        position: 'Главный врач',
        clinicName: 'Стоматологическая клиника "Улыбка"',
        clinicAddress: 'г. Москва, ул. Ленина, д. 10',
        city: 'Москва',
        savedAddresses: [
          {
            id: 'addr-1',
            city: 'Москва',
            street: 'ул. Ленина',
            building: '10',
            office: 'офис 5',
            isDefault: true
          },
          {
            id: 'addr-2',
            city: 'Москва',
            street: 'ул. Пушкина',
            building: '25',
            office: 'кабинет 12',
            isDefault: false
          }
        ]
      });
      return true;
    }
    return false;
  };

  const register = (data: RegisterData): boolean => {
    // Имитация регистрации
    setUser({
      inn: data.inn,
      email: data.email,
      phone: data.phone,
      fullName: data.fullName,
      position: data.position,
      clinicName: 'Новая клиника',
      clinicAddress: data.clinicAddress,
      city: 'Москва',
      savedAddresses: []
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addAddress = (address: Omit<DeliveryAddress, 'id'>) => {
    if (!user) return;

    const newAddress: DeliveryAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };

    // Если новый адрес по умолчанию, сбросить флаг у остальных
    const updatedAddresses = address.isDefault
      ? user.savedAddresses.map(a => ({ ...a, isDefault: false }))
      : user.savedAddresses;

    setUser({
      ...user,
      savedAddresses: [...updatedAddresses, newAddress]
    });
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      savedAddresses: user.savedAddresses.filter(a => a.id !== id)
    });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      savedAddresses: user.savedAddresses.map(a => ({
        ...a,
        isDefault: a.id === id
      }))
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        addAddress,
        removeAddress,
        setDefaultAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
