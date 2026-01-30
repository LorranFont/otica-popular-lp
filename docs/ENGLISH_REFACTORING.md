# English Code Refactoring

## Overview

This document outlines the refactoring process to convert all code variables, functions, and file names to English while keeping user-facing content in Portuguese.

## Changes Made

### 🔄 Data Structures (data/mockData.ts)

**Before (Portuguese):**

```typescript
interface Produto {
  modelo: string;
  marca: string;
  imagem: string;
  imagemHover: string;
  preco: number;
  precoPromocional?: number;
  categoria: string;
  descricao?: string;
  disponivel: boolean;
}

interface ItemCarrinho {
  modelo: string;
  marca: string;
  preco: number;
  precoPromocional?: number;
  imagem: string;
  quantidade: number;
}
```

**After (English):**

```typescript
interface Product {
  model: string;
  brand: string;
  image: string;
  hoverImage: string;
  price: number;
  promotionalPrice?: number;
  category: string;
  description?: string;
  available: boolean;
}

interface CartItem {
  model: string;
  brand: string;
  price: number;
  promotionalPrice?: number;
  image: string;
  quantity: number;
}
```

### 🔄 Store Functions (store/cartStore.ts)

**Before (Portuguese):**

```typescript
interface CartState {
  itens: ItemCarrinho[];
  totalItens: number;
  adicionarItem: (produto: any) => void;
  removerItem: (id: number | string) => void;
  atualizarQuantidade: (id: number | string, quantidade: number) => void;
  limparCarrinho: () => void;
  calcularTotais: () => void;
}
```

**After (English):**

```typescript
interface CartState {
  items: CartItem[];
  totalItems: number;
  addItem: (product: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}
```

### 🔄 Component Names

| Before (Portuguese) | After (English)   |
| ------------------- | ----------------- |
| `CardProduto.tsx`   | `ProductCard.tsx` |
| `CardUnidade.tsx`   | `StoreCard.tsx`   |

### 🔄 Component Props

**ProductCard.tsx:**

```typescript
// Before
interface CardProdutoProps {
  imagem: string;
  imagemHover: string;
  modelo: string;
  marca: string;
  preco: number;
  precoPromocional?: number;
}

// After
interface ProductCardProps {
  image: string;
  hoverImage: string;
  model: string;
  brand: string;
  price: number;
  promotionalPrice?: number;
}
```

**StoreCard.tsx:**

```typescript
// Before
interface CardUnidadeProps {
  nome: string;
  endereco: string;
  bairro: string;
  linkWhats: string;
}

// After
interface StoreCardProps {
  name: string;
  address: string;
  neighborhood: string;
  whatsappLink: string;
}
```

### 🔄 Variable Names in Components

**app/page.tsx:**

```typescript
// Before
const passosExame = [...];
const scrollProdutos = (direction) => {...};
{PRODUTOS.map((produto) => ...)}
{UNIDADES.map((unid) => ...)}

// After
const examSteps = [...];
const scrollProducts = (direction) => {...};
{PRODUTOS.map((product) => ...)}
{UNIDADES.map((store) => ...)}
```

**components/Header.tsx:**

```typescript
// Before
const totalItens = useCartStore((state) => state.totalItens);
const paginasCompactas = pathname.includes("/carrinho");
const headerCompacto = isScrolled || paginasCompactas;

// After
const totalItems = useCartStore((state) => state.totalItems);
const compactPages = pathname.includes("/carrinho");
const compactHeader = isScrolled || compactPages;
```

**app/carrinho/page.tsx:**

```typescript
// Before
const { itens, removerItem, atualizarQuantidade } = useCartStore();
const handleQuantidadeChange = (id, novaQuantidade) => {...};

// After
const { items, removeItem, updateQuantity } = useCartStore();
const handleQuantityChange = (id, newQuantity) => {...};
```

### 🔄 API Service Functions

**data/mockData.ts:**

```typescript
// Before
export const mockApiService = {
  async getProdutos(): Promise<Produto[]> {...},
  async getProdutoPorId(id): Promise<Produto | null> {...},
  async getProdutosPorCategoria(categoria): Promise<Produto[]> {...},
  async getUnidades(): Promise<Unidade[]> {...},
  async getUsuario(id): Promise<Usuario | null> {...}
};

// After
export const mockApiService = {
  async getProducts(): Promise<Product[]> {...},
  async getProductById(id): Promise<Product | null> {...},
  async getProductsByCategory(category): Promise<Product[]> {...},
  async getStores(): Promise<Store[]> {...},
  async getUser(id): Promise<User | null> {...}
};
```

### 🔄 Store Functions (store/appStore.ts)

**Before (Portuguese):**

```typescript
interface AppState {
  produtos: Produto[];
  unidades: Unidade[];
  produtoSelecionado: Produto | null;
  carregandoProdutos: boolean;
  carregarProdutos: () => Promise<void>;
  filtrarProdutos: (termo: string) => Produto[];
  obterProdutosPorCategoria: (categoria: string) => Produto[];
}
```

**After (English):**

```typescript
interface AppState {
  products: Product[];
  stores: Store[];
  selectedProduct: Product | null;
  loadingProducts: boolean;
  loadProducts: () => Promise<void>;
  filterProducts: (term: string) => Product[];
  getProductsByCategory: (category: string) => Product[];
}
```

## What Stayed in Portuguese

✅ **User-facing content:**

- Button text: "Adicionar ao Carrinho"
- Page titles: "Meu Carrinho"
- Form labels and placeholders
- Product descriptions
- Store information
- All text visible to users

✅ **File paths that users see:**

- `/carrinho` (cart URL)
- `/produto` (product URL)

## Benefits of This Refactoring

### 1. **Code Consistency**

- All code follows English naming conventions
- Easier for international developers to understand
- Consistent with most open-source projects

### 2. **Maintainability**

- Clearer variable names for developers
- Better IDE support and autocomplete
- Easier code reviews

### 3. **Scalability**

- Ready for international team collaboration
- Easier to integrate with English documentation
- Standard practice in the industry

### 4. **Type Safety**

- Better TypeScript support
- Clearer interface definitions
- Reduced naming conflicts

## File Structure After Refactoring

```
├── data/
│   └── mockData.ts          # ✅ English interfaces and functions
├── store/
│   ├── cartStore.ts         # ✅ English state and actions
│   └── appStore.ts          # ✅ English state and actions
├── components/
│   ├── Header.tsx           # ✅ English variables
│   ├── ProductCard.tsx      # ✅ New English component
│   ├── StoreCard.tsx        # ✅ New English component
│   ├── CardProduto.tsx      # 🔄 Legacy (can be removed)
│   └── CardUnidade.tsx      # 🔄 Legacy (can be removed)
├── app/
│   ├── page.tsx             # ✅ English variables
│   └── carrinho/page.tsx    # ✅ English variables
├── examples/
│   └── storeUsage.tsx       # ✅ English examples
└── docs/
    └── ENGLISH_REFACTORING.md
```

## Migration Checklist

### ✅ Completed

- [x] Update data interfaces (Product, Store, CartItem, User)
- [x] Update store functions and state names
- [x] Create new English components (ProductCard, StoreCard)
- [x] Update variable names in all components
- [x] Update function names and parameters
- [x] Update API service function names
- [x] Create English documentation and examples

### 🔄 Optional Next Steps

- [ ] Remove legacy Portuguese components
- [ ] Add English comments to complex functions
- [ ] Update any remaining Portuguese variable names
- [ ] Create English unit tests

## Usage Examples

### Using the Cart Store

```typescript
// ✅ English
const { items, totalItems, addItem, removeItem } = useCartStore();

// ❌ Old Portuguese
const { itens, totalItens, adicionarItem, removerItem } = useCartStore();
```

### Using Components

```tsx
// ✅ English
<ProductCard
  id={product.id}
  image={product.image}
  hoverImage={product.hoverImage}
  model={product.model}
  brand={product.brand}
  price={product.price}
  promotionalPrice={product.promotionalPrice}
/>

// ❌ Old Portuguese
<CardProduto {...produto} />
```

This refactoring maintains all functionality while making the codebase more professional and internationally accessible.
