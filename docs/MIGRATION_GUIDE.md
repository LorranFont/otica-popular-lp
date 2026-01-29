# Guia de Migração: Context API → Zustand

## Resumo das Mudanças

Este guia documenta a migração do Context API para Zustand no sistema da Ótica Popular.

## Antes vs Depois

### Context API (Antes)

```tsx
// context/CartContext.tsx
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  // ... lógica do carrinho
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalItens }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};

// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

// Uso nos componentes
const { cart, addToCart, totalItens } = useCart();
```

### Zustand (Depois)

```tsx
// store/cartStore.ts
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      itens: [],
      totalItens: 0,
      subtotal: 0,
      adicionarItem: (produto) => {
        /* lógica */
      },
      // ... outras actions
    }),
    { name: "otica-cart-storage" }
  )
);

// app/layout.tsx (sem provider!)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// Uso nos componentes
const { itens, adicionarItem, totalItens } = useCartStore();
// ou seletor específico para performance:
const totalItens = useCartStore((state) => state.totalItens);
```

## Vantagens da Migração

### 1. **Menos Boilerplate**

- ❌ Context: Provider, createContext, useContext, error handling
- ✅ Zustand: Apenas o store e o hook

### 2. **Performance**

- ❌ Context: Re-renderiza todos os consumidores quando qualquer valor muda
- ✅ Zustand: Re-renderiza apenas componentes que usam valores específicos

### 3. **Persistência Automática**

- ❌ Context: Precisa implementar localStorage manualmente
- ✅ Zustand: Middleware `persist` automático

### 4. **TypeScript**

- ❌ Context: Tipos complexos, verificações de undefined
- ✅ Zustand: Tipos simples e diretos

### 5. **DevTools**

- ❌ Context: Sem ferramentas de debug específicas
- ✅ Zustand: Integração com Redux DevTools

## Padrões de Migração

### 1. Estado Simples

```tsx
// Antes (Context)
const [items, setItems] = useState([]);

// Depois (Zustand)
const items = useCartStore((state) => state.itens);
```

### 2. Actions

```tsx
// Antes (Context)
const addToCart = (product) => {
  setCart((prev) => [...prev, product]);
};

// Depois (Zustand)
adicionarItem: (produto) => {
  set((state) => ({ itens: [...state.itens, produto] }));
};
```

### 3. Computed Values

```tsx
// Antes (Context)
const totalItens = cart.reduce((acc, item) => acc + item.quantidade, 0);

// Depois (Zustand)
calcularTotais: () => {
  const { itens } = get();
  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);
  set({ totalItens });
};
```

## Checklist de Migração

### ✅ Concluído

- [x] Criar stores Zustand
- [x] Remover Context providers
- [x] Atualizar componentes para usar stores
- [x] Implementar persistência
- [x] Adicionar tipos TypeScript
- [x] Remover arquivos de Context

### 🔄 Para Projetos Futuros

- [ ] Configurar Redux DevTools
- [ ] Implementar middleware de logging
- [ ] Adicionar testes para stores
- [ ] Criar stores para outras funcionalidades

## Troubleshooting

### Problema: "Cannot read property of undefined"

```tsx
// ❌ Problema
const cart = useCartStore((state) => state.cart); // undefined

// ✅ Solução
const itens = useCartStore((state) => state.itens); // nome correto
```

### Problema: Re-renderizações desnecessárias

```tsx
// ❌ Problema - re-renderiza sempre
const store = useCartStore();

// ✅ Solução - seletor específico
const totalItens = useCartStore((state) => state.totalItens);
```

### Problema: Estado não persiste

```tsx
// ✅ Verificar se o middleware persist está configurado
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      /* store */
    }),
    { name: "storage-key" } // ← importante!
  )
);
```

## Performance Tips

### 1. Use Seletores Específicos

```tsx
// ❌ Lento - re-renderiza sempre
const { itens, totalItens, subtotal } = useCartStore();

// ✅ Rápido - re-renderiza só quando totalItens muda
const totalItens = useCartStore((state) => state.totalItens);
```

### 2. Combine Seletores Relacionados

```tsx
// ✅ Bom - agrupa valores que mudam juntos
const { totalItens, subtotal } = useCartStore((state) => ({
  totalItens: state.totalItens,
  subtotal: state.subtotal,
}));
```

### 3. Use Shallow Compare para Objetos

```tsx
import { shallow } from "zustand/shallow";

const { itens, totalItens } = useCartStore(
  (state) => ({ itens: state.itens, totalItens: state.totalItens }),
  shallow
);
```

## Recursos Adicionais

- [Documentação Zustand](https://zustand-demo.pmnd.rs/)
- [Comparação Context vs Zustand](https://github.com/pmndrs/zustand#comparison-with-other-libraries)
- [Middleware Persist](https://github.com/pmndrs/zustand#persist-middleware)
